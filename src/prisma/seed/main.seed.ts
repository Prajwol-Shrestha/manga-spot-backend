import { userSeed } from './user.seed';

async function main() {
  console.log('🌱 Starting seeder');

  await userSeed();

  console.log('🌱 Seeding completed');
}

main();
