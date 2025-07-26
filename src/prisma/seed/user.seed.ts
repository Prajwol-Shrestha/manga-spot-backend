import { PrismaClient } from '../../../generated/prisma';
import * as bycrypt from 'bcrypt';

export async function userSeed() {
  const prismaClient = new PrismaClient();

  console.log('🌱 Seeding users');

  const users = [
    {
      username: 'prajwol',
      name: 'Prajwol',
      email: 'prajwol@example.com',
      password: await bycrypt.hash('Test@123', 10),
    },
    {
      username: 'prajwol2',
      name: 'Prajwol2',
      email: 'prajwol2@example.com',
      password: await bycrypt.hash('Test@123', 10),
    },
  ];

  const user = await prismaClient.user.createMany({ data: users });

  console.log(`🌱 Seeded ${user.count} users`);
}
