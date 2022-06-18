import { createRandomIdString } from 'src/util/random'
import { prisma } from '@testUtil/prisma'
import { PairQS } from '../query-service/pair-qs'
import { PairDTO } from 'src/app/query-service-interface/pair-qs'
import { seedTeam, seedPair } from '@testUtil/seed-factory'

describe('pair-qs.integration.ts', () => {
  const pairQS = new PairQS(prisma)
  beforeAll(async () => {
    await prisma.pair.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('getAll', () => {
    afterEach(async () => {
      await prisma.pair.deleteMany({})
    })
    it('[正常系] Pairを取得できる', async () => {
      const teamId = 'testId'
      const PairExpected = new PairDTO({
        id: createRandomIdString(),
        name: 'a',
        members: [],
      })
      await seedTeam({ id: teamId })
      await seedPair({
        id: PairExpected.id,
        name: PairExpected.name,
        teamId: teamId,
      })

      const pairs = await pairQS.getAll()
      expect(pairs).toHaveLength(1)
      expect(pairs[0]).toEqual(PairExpected)
    })
  })
})
