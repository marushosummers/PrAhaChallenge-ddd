import { Team } from 'src/domain/entities/Team'
import { createRandomIdString } from 'src/util/random'
import { prisma } from '@testUtil/prisma'
import { TeamRepository } from '../../repository/sample/some-data-repository'

describe('some-data-repository.integration.ts', () => {
  const teamRepo = new TeamRepository(prisma)
  beforeAll(async () => {
    await prisma.team.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('save', () => {
    afterEach(async () => {
      await prisma.team.deleteMany({})
    })
    it('[正常系]teamを保存できる', async () => {
      const teamExpected = {
        id: 1,
        name: 'test'
      }
      await teamRepo.save(new Team(teamExpected))

      const allTeams = await prisma.team.findMany({})
      expect(allTeams).toHaveLength(1)
      expect(allTeams[0]).toEqual(teamExpected)
    })
  })
})
