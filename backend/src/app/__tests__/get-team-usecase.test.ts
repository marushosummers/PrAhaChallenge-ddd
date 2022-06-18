import { PrismaClient } from '@prisma/client'
import { GetTeamUseCase } from '../get-team-usecase'
import { TeamQS } from '../../infra/db/query-service/team-qs'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/team-qs.ts')

describe('do', () => {
  let mockTeamQS: MockedObjectDeep<TeamQS>
  beforeAll(() => {
    const prisma = new PrismaClient()
    mockTeamQS = mocked(new TeamQS(prisma), true)
  })
  it('[正常系]: 例外が発生しない', async () => {
    const usecase = new GetTeamUseCase(mockTeamQS)
    return expect(usecase.do()).resolves.toBe(undefined)
  })
  it('[異常系]: 例外が発生した場合、例外が発生する', () => {
    const ERROR_MESSAGE = 'error!'
    mockTeamQS.getAll.mockRejectedValueOnce(ERROR_MESSAGE)
    const usecase = new GetTeamUseCase(mockTeamQS)
    return expect(usecase.do()).rejects.toEqual(ERROR_MESSAGE)
  })
})
