import { createRandomIdString } from 'src/util/random'
import { prisma } from '@testUtil/prisma'
import { TeamQS } from '../query-service/team-qs'
import { TeamDTO } from 'src/app/query-service-interface/team-qs'
import { seedTeam } from '@testUtil/seed-factory'

describe('team-qs.integration.ts', () => {
  const teamQS = new TeamQS(prisma)
  beforeAll(async () => {
    await prisma.team.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('getAll', () => {
    afterEach(async () => {
      await prisma.team.deleteMany({})
    })
    it('[正常系] Teamを取得できる', async () => {
      const TeamExpected = new TeamDTO({
        id: createRandomIdString(),
        name: 1,
        pairs: [],
      })
      await seedTeam({ id: TeamExpected.id, name: TeamExpected.name })

      const teams = await teamQS.getAll()
      expect(teams).toHaveLength(1)
      expect(teams[0]).toEqual(TeamExpected)
    })
  })
})
