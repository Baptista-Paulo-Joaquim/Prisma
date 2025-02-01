const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Lia', email: 'lia@gmail.com' },
      { name: 'Baptista', email: 'baptista@gmail.com' },
      { name: 'Gerson', email: 'gerson@gmail.com' },
      { name: 'Ludymila', email: 'mila@gmail.com' },
    ],
  });
}

main()
  .then(() => console.log('Seeding completed!'))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
}).finally(() => prisma.$disconnect());
