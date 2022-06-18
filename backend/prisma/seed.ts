import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

import * as faker from 'faker';


const prisma  = new PrismaClient();

const range = (n: number): number[] => (Array(n).fill(null).map((v, k) => { return k + 1 }))

const fakeTeams = range(3).map(n => (
  {
    id: faker.datatype.uuid(),
    name: n,
    pair: {
      id: faker.datatype.uuid(),
      name: 'a',
    }
  }
));

const fakeTasks = range(80).map(n => (
  {
    id: faker.datatype.uuid(),
    content: `PrAhaTask${n}`,
  }
));

const fakeMembers = range(9).map(n => (
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email()
  }
));

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  console.log('Seeding...');
  console.log(fakeTeams)
  console.log(fakeMembers)
  console.log(fakeTasks)

  /// --------- Users ---------------
  // for (let i = 0; i < fakerRounds; i++) {
  // await prisma.user.create({ data: fakerUser() });
  // }
};

main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect();
});
