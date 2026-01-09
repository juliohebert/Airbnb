# 🧪 Guia de QA - Casa Verde (Guia Digital)

## 📋 Informações de Acesso

### URLs
- **Frontend (Produção):** https://casa-verde-lac.vercel.app
- **Backend API:** https://casa-verde-api.onrender.com
- **Health Check:** https://casa-verde-api.onrender.com/health

### Credenciais de Teste

#### Usuário Super Admin
- **Email:** `julio@email.com`
- **Senha:** `[senha que você usou no registro]`
- **Tipo:** Super Administrador (acesso total)

#### Usuário Regular (se existir)
- **Email:** `silva@email.com`
- **Senha:** `[senha que foi usada]`
- **Tipo:** Proprietário regular

---

## 🎯 Cenários de Teste

### 1️⃣ REGISTRO E AUTENTICAÇÃO

#### 1.1 Registro de Novo Usuário
**URL:** https://casa-verde-lac.vercel.app/#/register

**Passos:**
1. Clicar em "Criar Conta" na tela de login
2. Preencher todos os campos:
   - Email válido
   - Senha forte
   - Nome da Propriedade
   - Nome do Proprietário
3. Clicar em "Criar Conta"

**Resultado Esperado:**
- ✅ Usuário criado com sucesso
- ✅ Redirecionado automaticamente para o Dashboard
- ✅ Token JWT salvo no localStorage
- ✅ Dados do usuário salvos no banco PostgreSQL (Neon)

**Validações:**
- ❌ Email duplicado deve retornar erro
- ❌ Campos vazios devem ser bloqueados
- ❌ Email inválido deve mostrar erro

---

#### 1.2 Login
**URL:** https://casa-verde-lac.vercel.app/#/login

**Passos:**
1. Acessar página de login
2. Informar email e senha
3. Clicar em "Entrar"

**Resultado Esperado:**
- ✅ Login bem-sucedido
- ✅ Redirecionado para `/admin`
- ✅ Token JWT válido por 7 dias

**Validações:**
- ❌ Credenciais inválidas devem retornar erro
- ❌ Conta suspensa deve exibir mensagem específica
- ✅ Logout deve limpar sessão e redirecionar para login

---

### 2️⃣ PAINEL ADMINISTRATIVO

#### 2.1 Dashboard de Propriedades
**URL:** https://casa-verde-lac.vercel.app/#/admin

**Funcionalidades:**
- Ver lista de todas as propriedades do usuário
- Criar nova propriedade
- Editar propriedade existente
- Excluir propriedade
- Copiar link do hóspede
- Visualizar como hóspede

**Passos para Criar Propriedade:**
1. Clicar em "Adicionar Imóvel"
2. Preencher informações básicas
3. Salvar propriedade

**Resultado Esperado:**
- ✅ Propriedade criada no banco
- ✅ ID único gerado (propertyId)
- ✅ Link de hóspede disponível: `#/guide/{propertyId}`

---

#### 2.2 Edição de Propriedade

##### Aba "Local"
**Campos Editáveis:**
- Nome do Chalé/Apartamento
- Endereço Completo

##### Aba "Anfitrião"
**Campos Editáveis:**
- Nome(s) de Contato
- Bio/Mensagem de Boas-vindas
- WhatsApp

##### Aba "Wi-Fi"
**Campos Editáveis:**
- Nome da Rede (SSID)
- Senha do Wi-Fi

##### Aba "Check-in/out" ⭐ NOVA
**Campos Editáveis:**

**Check-in:**
- Horário de Entrada (ex: 14h00)
- Código de Acesso (ex: 1234 ou #5678*)
- Instruções de Entrada (lista de passos)
  - Adicionar/Remover passos
  - Título do passo
  - Descrição detalhada

**Check-out:**
- Horário Limite de Saída (ex: 11h00)
- Instruções de Saída (lista de passos)
  - Adicionar/Remover passos
  - Título do passo
  - Descrição detalhada

##### Aba "Comodidades" ⭐ NOVA
**Funcionalidades:**
- Adicionar/Remover categorias (ex: Cozinha, Quarto, Lazer)
- Editar nome da categoria
- Escolher ícone (Material Icons: kitchen, bed, tv, pool, etc.)
- Adicionar/Remover itens dentro de cada categoria

**Exemplo:**
```
Categoria: Cozinha | Ícone: kitchen
  - Geladeira
  - Fogão 4 bocas
  - Microondas
  - Cafeteira
```

##### Aba "Regras"
**Funcionalidades:**
- Adicionar/Remover regras
- Editar texto da regra

---

### 3️⃣ VISUALIZAÇÃO DO HÓSPEDE

#### 3.1 Acessar Guia como Hóspede
**URLs de Teste:**
- https://casa-verde-lac.vercel.app/#/guide/ybxg6kk
- https://casa-verde-lac.vercel.app/#/guide/5l32rj5

**Páginas Disponíveis:**
1. **Home** - Boas-vindas e informações do anfitrião
2. **Wi-Fi** - Credenciais da rede
3. **Contato** - Informações de contato do anfitrião
4. **Regras** - Regras da propriedade
5. **Check-in** - Horário, código de acesso e instruções
6. **Check-out** - Horário limite e instruções de saída
7. **Comodidades** - Lista de todas as comodidades
8. **Como Chegar** - Direções e localização
9. **Feedback** - Deixar avaliação

**Validações:**
- ✅ Todas as informações devem vir da API
- ✅ Dados devem corresponder ao editado no painel admin
- ✅ Design responsivo (mobile e desktop)
- ✅ Modo escuro funcional
- ❌ Propriedade inexistente deve mostrar "Guia não encontrado"

---

### 4️⃣ SUPER ADMIN

#### 4.1 Painel de Controle
**URL:** https://casa-verde-lac.vercel.app/#/super-admin

**Requisitos:**
- Usuário deve ter permissão `is_super_admin = true`
- Usuário `julio@email.com` já está promovido

**Funcionalidades:**
- Ver lista de todos os usuários cadastrados
- Suspender/Ativar usuários
- Ver data de cadastro
- Ver status da conta

**Passos para Testar:**
1. Fazer login com usuário super admin
2. Acessar `/super-admin`
3. Ver lista de usuários
4. Suspender um usuário
5. Tentar fazer login com usuário suspenso
6. Reativar usuário

**Resultado Esperado:**
- ✅ Lista carregada do banco de dados
- ✅ Suspensão bloqueia login
- ✅ Reativação libera acesso
- ❌ Usuário comum não deve acessar esta página (erro 403)

---

## 🔧 Testes Técnicos

### API Endpoints

#### Autenticação
```bash
# Registro
POST https://casa-verde-api.onrender.com/api/auth/register
Body: {
  "email": "teste@email.com",
  "password": "senha123",
  "propertyName": "Casa Teste",
  "ownerName": "João Silva"
}

# Login
POST https://casa-verde-api.onrender.com/api/auth/login
Body: {
  "email": "teste@email.com",
  "password": "senha123"
}
```

#### Guias (Requer Token)
```bash
# Listar guias do usuário
GET https://casa-verde-api.onrender.com/api/guides
Header: Authorization: Bearer {token}

# Obter guia específico (público)
GET https://casa-verde-api.onrender.com/api/guides/{propertyId}

# Salvar/Atualizar guia
PUT https://casa-verde-api.onrender.com/api/guides/{propertyId}
Header: Authorization: Bearer {token}
Body: {guideData}

# Deletar guia
DELETE https://casa-verde-api.onrender.com/api/guides/{propertyId}
Header: Authorization: Bearer {token}
```

#### Admin (Requer Super Admin)
```bash
# Listar todos os usuários
GET https://casa-verde-api.onrender.com/api/admin/users
Header: Authorization: Bearer {token}

# Atualizar status do usuário
PATCH https://casa-verde-api.onrender.com/api/admin/users/{userId}
Header: Authorization: Bearer {token}
Body: {
  "isActive": false
}
```

---

## 🐛 Bugs Conhecidos e Limitações

### ⚠️ Atenção
1. **Render Free Tier:** Backend pode "dormir" após 15 minutos de inatividade. Primeira requisição pode levar 30-60 segundos para acordar o servidor.
2. **CORS:** Configurado apenas para `https://casa-verde-lac.vercel.app`

### ✅ Resolvido
- ~~Erro 403 no SuperAdmin~~ - Usuário promovido a super admin
- ~~GuestRouter usando localStorage~~ - Integrado com API
- ~~Falta campos de check-in/out~~ - Adicionado aba completa
- ~~Falta editor de comodidades~~ - Adicionado aba completa

---

## 📊 Checklist de QA

### Funcional
- [ ] Registro de novo usuário funciona
- [ ] Login e logout funcionam corretamente
- [ ] Dashboard lista propriedades do usuário
- [ ] Criar nova propriedade salva no banco
- [ ] Editar propriedade atualiza dados
- [ ] Excluir propriedade remove do banco
- [ ] Link do hóspede copia corretamente
- [ ] Todas as abas de edição funcionam:
  - [ ] Local
  - [ ] Anfitrião
  - [ ] Wi-Fi
  - [ ] Check-in/out
  - [ ] Comodidades
  - [ ] Regras
- [ ] Guia do hóspede carrega informações corretas
- [ ] Todas as páginas do guia funcionam
- [ ] SuperAdmin lista usuários
- [ ] Suspender/Ativar usuário funciona

### UI/UX
- [ ] Design responsivo em mobile
- [ ] Design responsivo em tablet
- [ ] Design responsivo em desktop
- [ ] Modo escuro funciona
- [ ] Navegação intuitiva
- [ ] Feedback visual em ações
- [ ] Loading states funcionam
- [ ] Mensagens de erro são claras

### Segurança
- [ ] Rotas protegidas requerem autenticação
- [ ] Super Admin routes verificam permissão
- [ ] Tokens expiram após 7 dias
- [ ] Senhas são hasheadas (bcrypt)
- [ ] SQL injection protegido (prepared statements)
- [ ] CORS configurado corretamente

### Performance
- [ ] Páginas carregam em < 3 segundos
- [ ] Imagens otimizadas
- [ ] API responde em < 1 segundo
- [ ] Sem memory leaks

---

## 📞 Suporte

**Desenvolvedor:** Julio Hebert  
**Repositório:** https://github.com/juliohebert/Airbnb  
**Stack:**
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + PostgreSQL
- Database: Neon (PostgreSQL Serverless)
- Deploy: Vercel (Frontend) + Render (Backend)

---

**Data do Documento:** 9 de Janeiro de 2026  
**Versão:** 1.0
