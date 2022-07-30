import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';

const prisma  = new PrismaClient();

type fakeTask = {
  id: string,
  content: string
}

const range = (n: number): number[] => (Array(n).fill(null).map((v, k) => { return k + 1 }))

const genFakeTeam = (teamName: number, fakeTasks: fakeTask[]) => (
  {
    id: faker.datatype.uuid(),
    name: teamName,
    pairs: {
      create: [
        {
          id: faker.datatype.uuid(),
          name: 'a',
          members: {
            create: range(3).map(n => (
              {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                email: faker.internet.email(),
                memberTasks: {
                  create: fakeTasks.map(task => (
                    {
                      id: faker.datatype.uuid(),
                      task: {
                        connect: {
                          id: task.id,
                        }
                      }
                    })
                  )
                }
              }
            ))
          }
        },
        {
          id: faker.datatype.uuid(),
          name: 'b',
          members: {
            create: range(2).map(n => (
              {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                email: faker.internet.email(),
                memberTasks: {
                  create: fakeTasks.map(task => (
                    {
                      id: faker.datatype.uuid(),
                      task: {
                        connect: {
                          id: task.id,
                        }
                      }
                    })
                  )
                }
              }
            ))
          }
        },
      ]
    }
  }
);

async function main() {
  const fakeTasks: fakeTask[] = range(80).map(n => (
    {
      id: faker.datatype.uuid(),
      content: `PrAhaTask${n}`,
    }
  ));

  // create Tasks
  await prisma.task.createMany({
    data: fakeTasks,
  })

  // create Teams, Pairs, Members
  for (const teamName of range(3)) {
    const fakeTeam = genFakeTeam(teamName, fakeTasks);
    await prisma.team.create({
      data: fakeTeam,
    })
  }
};

main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect();
});
