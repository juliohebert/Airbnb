# 🏡 Casa Verde - Guia Digital para Hospedagem

Sistema completo de guia digital para propriedades do Airbnb com gerenciamento multi-propriedade e autenticação.

## 🚀 Stack Tecnológica

### Frontend
- **React 19** + **TypeScript**
- **Vite** - Build tool
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Estilização

### Backend
- **Node.js** + **Express**
- **PostgreSQL** (Neon) - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Neon (PostgreSQL serverless)

---

## 📦 Instalação Local

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd Airbnb
```

### 2. Instalar dependências

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Configurar variáveis de ambiente

**Backend** - Crie `backend/.env`:
```env
DATABASE_URL=postgresql://...
JWT_SECRET=seu_secret_jwt
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Crie `.env.local`:
```env
VITE_API_URL=http://localhost:3001
```

### 4. Executar migração do banco de dados
```bash
cd backend
npm run migrate
```

### 5. Iniciar servidores

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
npm run dev
```

Acesse: `http://localhost:3000`

---

## 🌐 Deploy em Produção

Consulte o arquivo [DEPLOY.md](./DEPLOY.md) para instruções detalhadas de deploy no Render e Vercel.

**Resumo:**
1. Deploy do Backend no Render
2. Deploy do Frontend na Vercel
3. Configurar variáveis de ambiente
4. Executar migração no Render

---

## 🎯 Funcionalidades

### Para Anfitriões
- ✅ Autenticação segura (JWT)
- ✅ Gerenciamento de múltiplas propriedades
- ✅ Editor de guia digital personalizado
- ✅ Informações de WiFi, regras, check-in/out
- ✅ Link único para cada propriedade
- ✅ Interface responsiva e dark mode

### Para Hóspedes
- ✅ Acesso ao guia sem login
- ✅ Informações completas da propriedade
- ✅ Dados de contato do anfitrião
- ✅ Visualização otimizada para mobile

### Para Super Admin
- ✅ Gerenciamento de usuários
- ✅ Suspensão/ativação de contas
- ✅ Visualização de estatísticas

---

## 📁 Estrutura do Projeto

```
Airbnb/
├── backend/              # API Node.js
│   ├── server.js        # Servidor Express
│   ├── db.js            # Conexão PostgreSQL
│   ├── migrate.js       # Migrations
│   └── .env             # Variáveis de ambiente
├── pages/               # Páginas React
│   ├── Home.tsx
│   ├── Management.tsx   # Gerenciamento de propriedades
│   ├── Login.tsx
│   ├── Register.tsx
│   └── SuperAdmin.tsx
├── api.ts               # Cliente da API
├── App.tsx              # Componente principal
├── types.ts             # Tipos TypeScript
└── constants.tsx        # Constantes e dados iniciais
```

---

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Conexão segura com PostgreSQL (SSL)
- Validação de dados no backend
- CORS configurado

---

## 📝 Licença

MIT License - sinta-se livre para usar em seus projetos!

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para tornar a hospedagem mais acessível e organizada**
