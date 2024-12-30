const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Rose', email: 'rose@gm.com' },
      { name: 'Ana', email: 'ana@gm.com' },
      { name: 'Paul', email: 'paul@gm.com' },
      { name: 'William', email: 'william@gm.com' },
    ],
  });
}

main()
  .then(() => console.log('Seeding completed!'))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
}).finally(() => prisma.$disconnect());
