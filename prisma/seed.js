const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Rose', email: 'rose@gmail.com' },
      { name: 'Ana', email: 'ana@gmail.com' },
      { name: 'Paul', email: 'paul@gmail.com' },
      { name: 'William', email: 'william@gmail.com' },
    ],
  });
}

main()
  .then(() => console.log('Seeding completed!'))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
}).finally(() => prisma.$disconnect());
