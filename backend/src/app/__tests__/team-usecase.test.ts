import { PrismaClient } from '@prisma/client'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { PostTeamUseCase } from '../post-team-usecase'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/team-repository')

describe('do', () => {
  let mockTeamRepo: MockedObjectDeep<TeamRepository>
  beforeAll(() => {
    const prisma = new PrismaClient()
    mockTeamRepo = mocked(new TeamRepository(prisma), true)
  })
  it('[正常系]: 例外が発生しない', async () => {
    const usecase = new PostTeamUseCase(mockTeamRepo)
    return expect(
      usecase.do({
        name: 1
      }),
    ).resolves.toBe(undefined)
  })
  it('[異常系]: saveで例外が発生した場合、例外が発生する', () => {
    const ERROR_MESSAGE = 'error!'
    mockTeamRepo.save.mockRejectedValueOnce(ERROR_MESSAGE)
    const usecase = new PostTeamUseCase(mockTeamRepo)
    return expect(
      usecase.do({
        name: 1
      }),
    ).rejects.toEqual(ERROR_MESSAGE)
  })
})
