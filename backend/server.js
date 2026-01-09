import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db.js';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Auto-migrate on startup
async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Verificando/executando migrações do banco de dados...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        property_name VARCHAR(255) NOT NULL,
        owner_name VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        is_super_admin BOOLEAN DEFAULT false,
        created_at BIGINT NOT NULL,
        subscription_expires_at BIGINT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS payment_records (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        date BIGINT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN ('paid', 'pending', 'failed')),
        method VARCHAR(100) NOT NULL,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS guides (
        id VARCHAR(255) PRIMARY KEY,
        host_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        property_id VARCHAR(255) UNIQUE NOT NULL,
        data JSONB NOT NULL,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_guides_host_id ON guides(host_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_guides_property_id ON guides(property_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_payment_records_user_id ON payment_records(user_id);');
    
    console.log('✅ Migrações concluídas com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante as migrações:', error);
  } finally {
    client.release();
  }
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Middleware de autenticação
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await query('SELECT id, email, property_name, owner_name, is_active, is_super_admin FROM users WHERE id = $1', [decoded.userId]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    
    req.user = result.rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Registro de usuário
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, propertyName, ownerName } = req.body;
    
    if (!email || !password || !propertyName || !ownerName) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // Verificar se o email já existe
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = Math.random().toString(36).substring(2, 15);
    const createdAt = Date.now();
    
    await query(
      'INSERT INTO users (id, email, password, property_name, owner_name, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [userId, email, hashedPassword, propertyName, ownerName, createdAt]
    );
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      user: { id: userId, email, propertyName, ownerName, isActive: true },
      token
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    if (!user.is_active) {
      return res.status(403).json({ 
        error: 'Conta suspensa',
        suspended: true,
        adminContact: 'admin@casaverde.com'
      });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        propertyName: user.property_name,
        ownerName: user.owner_name,
        isActive: user.is_active,
        isSuperAdmin: user.is_super_admin
      },
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Obter guias do usuário
app.get('/api/guides', authenticate, async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM guides WHERE host_id = $1',
      [req.user.id]
    );
    
    const guides = {};
    result.rows.forEach(row => {
      guides[row.property_id] = row.data;
    });
    
    res.json(guides);
  } catch (error) {
    console.error('Erro ao buscar guias:', error);
    res.status(500).json({ error: 'Erro ao buscar guias' });
  }
});

// Obter guia específico (público)
app.get('/api/guides/:propertyId', async (req, res) => {
  try {
    const result = await query(
      'SELECT data FROM guides WHERE property_id = $1',
      [req.params.propertyId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guia não encontrado' });
    }
    
    res.json(result.rows[0].data);
  } catch (error) {
    console.error('Erro ao buscar guia:', error);
    res.status(500).json({ error: 'Erro ao buscar guia' });
  }
});

// Salvar/atualizar guia
app.put('/api/guides/:propertyId', authenticate, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const guideData = req.body;
    
    // Verificar se o guia existe
    const existing = await query(
      'SELECT id FROM guides WHERE property_id = $1 AND host_id = $2',
      [propertyId, req.user.id]
    );
    
    if (existing.rows.length > 0) {
      // Atualizar
      await query(
        'UPDATE guides SET data = $1, updated_date = CURRENT_TIMESTAMP WHERE property_id = $2 AND host_id = $3',
        [JSON.stringify(guideData), propertyId, req.user.id]
      );
    } else {
      // Criar novo
      const id = Math.random().toString(36).substring(2, 15);
      await query(
        'INSERT INTO guides (id, host_id, property_id, data) VALUES ($1, $2, $3, $4)',
        [id, req.user.id, propertyId, JSON.stringify(guideData)]
      );
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar guia:', error);
    res.status(500).json({ error: 'Erro ao salvar guia' });
  }
});

// Deletar guia
app.delete('/api/guides/:propertyId', authenticate, async (req, res) => {
  try {
    await query(
      'DELETE FROM guides WHERE property_id = $1 AND host_id = $2',
      [req.params.propertyId, req.user.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar guia:', error);
    res.status(500).json({ error: 'Erro ao deletar guia' });
  }
});

// Super Admin - Listar todos os usuários
app.get('/api/admin/users', authenticate, async (req, res) => {
  try {
    if (!req.user.is_super_admin) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    const result = await query(
      'SELECT id, email, property_name, owner_name, is_active, created_at, subscription_expires_at FROM users ORDER BY created_date DESC'
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Super Admin - Atualizar status do usuário
app.patch('/api/admin/users/:userId', authenticate, async (req, res) => {
  try {
    if (!req.user.is_super_admin) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    const { isActive } = req.body;
    
    await query(
      'UPDATE users SET is_active = $1, updated_date = CURRENT_TIMESTAMP WHERE id = $2',
      [isActive, req.params.userId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Rota temporária para promover usuário a super admin (REMOVER EM PRODUÇÃO)
app.post('/api/admin/promote', authenticate, async (req, res) => {
  try {
    // Promove o usuário atual a super admin
    await query(
      'UPDATE users SET is_super_admin = true WHERE id = $1',
      [req.user.id]
    );
    
    res.json({ success: true, message: 'Usuário promovido a Super Admin' });
  } catch (error) {
    console.error('Erro ao promover usuário:', error);
    res.status(500).json({ error: 'Erro ao promover usuário' });
  }
});

// Iniciar servidor
async function startServer() {
  await runMigrations();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
