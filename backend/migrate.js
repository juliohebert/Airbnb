import pool from './db.js';

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Iniciando migração do banco de dados...');
    
    // Tabela de usuários
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
    console.log('✅ Tabela users criada');

    // Tabela de histórico de pagamentos
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
    console.log('✅ Tabela payment_records criada');

    // Tabela de guias (propriedades)
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
    console.log('✅ Tabela guides criada');

    // Índices para melhor performance
    await client.query('CREATE INDEX IF NOT EXISTS idx_guides_host_id ON guides(host_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_guides_property_id ON guides(property_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_payment_records_user_id ON payment_records(user_id);');
    console.log('✅ Índices criados');

    console.log('✨ Migração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
