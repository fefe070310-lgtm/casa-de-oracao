const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@casajump.com.br';
  
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('O usuário admin já existe!');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin12345', salt);

  const user = await prisma.user.create({
    data: {
      name: 'Admin Casa de Oração',
      email,
      password: hashedPassword,
      phone: '(12) 99999-9999',
      city: 'SJC',
      role: 'ADMIN',
    },
  });

  console.log('Usuário admin criado com sucesso:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
