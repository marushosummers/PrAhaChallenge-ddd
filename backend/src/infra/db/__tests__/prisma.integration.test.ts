import { prisma } from '@testUtil/prisma'

describe('prism全般に関するテスト', () => {
  beforeAll(async () => {
    await prisma.team.deleteMany()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('基本的なcrud機能', () => {
    afterEach(async () => {
      await prisma.team.deleteMany()
    })
    it('DBに追加できる', async () => {
      await prisma.team.create({
        data: {
          id: 1,
          name: 'test',
        },
      })
      const allteam = await prisma.team.findMany()
      expect(allteam).toHaveLength(1)
    })
  })
  describe('トランザクション', () => {
    it('トランザクション処理中に問題が発生したらロールバックされる', async () => {
      try {
        const task1 = prisma.team.create({
          data: {
          id: 1,
          name: 'test',
          },
        })
        const task2 = prisma.team.create({
          data: {
          id: 1,
          name: 'test',
          },
        })
        await prisma.$transaction([task1, task2])
      } catch (error) {
        const allteam = await prisma.team.findMany()
        expect(allteam).toHaveLength(0)
      }
    })
  })
})
