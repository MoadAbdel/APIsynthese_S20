const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const users = [
  { id: 1, email: 'jean@snack-etoile.fr', password_clair: 'password123' },
  { id: 2, email: 'marie@snack-soleil.fr', password_clair: 'password123' },
];

const products = [
  { name: 'Portion de frites', quantity: 25, userId: 1 },
  { name: 'Coca-Cola', quantity: 48, userId: 1 },
  { name: 'Sprite', quantity: 30, userId: 1 },
  { name: 'Chips', quantity: 50, userId: 2 },
  { name: 'Glace vanille', quantity: 15, userId: 2 },
  { name: 'Glace fraise', quantity: 20, userId: 2 },
];

async function main() {
  for (const user of users) {
    const hashed = await bcrypt.hash(user.password_clair, 10);
    await prisma.user.upsert({
      where: { id: user.id },
      update: { email: user.email, password: hashed },
      create: { id: user.id, email: user.email, password: hashed },
    });
  }

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
