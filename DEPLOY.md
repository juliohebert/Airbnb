# Casa Verde - Deploy no Render

## Passos para Deploy do Backend no Render

### 1. Preparar o Repositório
- Faça commit de todo o código do backend:
  ```bash
  git add backend/
  git commit -m "feat: Add backend API with PostgreSQL"
  git push origin main
  ```

### 2. Criar Web Service no Render

1. Acesse [render.com](https://render.com) e faça login
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure o serviço:
   - **Name**: `casa-verde-api`
   - **Region**: `São Paulo (South America)`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 3. Configurar Variáveis de Ambiente

No painel do Render, vá em "Environment" e adicione:

```
DATABASE_URL=postgresql://neondb_owner:npg_LxXlJS2sHDI7@ep-polished-resonance-acz6kyvd-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
NODE_ENV=production
FRONTEND_URL=https://seu-app.vercel.app
PORT=3001
```

### 4. Deploy

- Clique em "Create Web Service"
- Render fará o deploy automaticamente
- Após o deploy, copie a URL gerada (ex: `https://casa-verde-api.onrender.com`)

### 5. Executar Migração

No painel do Render, vá em "Shell" e execute:
```bash
npm run migrate
```

---

## Deploy do Frontend na Vercel

### 1. Criar .env.local

Crie o arquivo `.env.local` na raiz do projeto:
```
VITE_API_URL=https://casa-verde-api.onrender.com
```

### 2. Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

Ou via interface web:

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New" → "Project"
3. Importe seu repositório
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Adicione variável de ambiente:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://casa-verde-api.onrender.com`

6. Clique em "Deploy"

### 3. Atualizar CORS no Backend

Após ter a URL da Vercel, atualize a variável `FRONTEND_URL` no Render com a URL do seu frontend.

---

## Testando

1. Acesse sua aplicação na Vercel
2. Tente fazer login/registro
3. Crie uma propriedade
4. Verifique o banco de dados no Neon

---

## Comandos Úteis

```bash
# Desenvolvimento local - Backend
cd backend
npm run dev

# Desenvolvimento local - Frontend
npm run dev

# Build do frontend
npm run build

# Preview do build
npm run preview
```

---

## Troubleshooting

### Erro de CORS
- Verifique se `FRONTEND_URL` no Render está correto
- Certifique-se que não tem `/` no final da URL

### Erro de conexão com banco
- Verifique a string de conexão `DATABASE_URL`
- Teste a conexão: `psql 'sua_connection_string'`

### Backend não inicia no Render
- Verifique os logs no painel do Render
- Confirme que todas as variáveis de ambiente estão configuradas
