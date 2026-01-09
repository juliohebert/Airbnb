// Teste direto da API para verificar resposta
const jwt = require('jsonwebtoken');

// Gerar token de teste para o super admin julio@email.com
const token = jwt.sign(
  { id: '1', email: 'julio@email.com', is_super_admin: true },
  'sua-chave-secreta-super-segura-aqui-12345',
  { expiresIn: '7d' }
);

console.log('\n🔑 Token gerado para teste:\n');
console.log(token);
console.log('\n\n📋 Comando CURL para testar:\n');
console.log(`curl -H "Authorization: Bearer ${token}" https://casa-verde-api.onrender.com/api/admin/users`);
console.log('\n');
