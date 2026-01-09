import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { id: '1', email: 'julio@email.com', is_super_admin: true },
  'sua-chave-secreta-super-segura-aqui-12345',
  { expiresIn: '7d' }
);

console.log('\n🔑 Testando API do Render...\n');

const response = await fetch('https://casa-verde-api.onrender.com/api/admin/users', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const data = await response.json();

console.log('📊 Status:', response.status);
console.log('📦 Resposta completa:\n');
console.log(JSON.stringify(data, null, 2));

if (data.length > 0) {
  console.log('\n✅ Verificação de campos:');
  const firstUser = data[0];
  console.log('- Tem isActive (camelCase)?', 'isActive' in firstUser);
  console.log('- Tem is_active (snake_case)?', 'is_active' in firstUser);
  console.log('- Valor de isActive:', firstUser.isActive);
  console.log('- Valor de is_active:', firstUser.is_active);
}
