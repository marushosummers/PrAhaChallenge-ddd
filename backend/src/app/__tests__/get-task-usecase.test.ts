import { PrismaClient } from '@prisma/client'
import { GetTaskUseCase } from '../get-task-usecase'
import { TaskQS } from '../../infra/db/query-service/task-qs'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/task-qs.ts')

describe('do', () => {
  let mockTaskQS: MockedObjectDeep<TaskQS>
  beforeAll(() => {
    const prisma = new PrismaClient()
    mockTaskQS = mocked(new TaskQS(prisma), true)
  })
  it('[正常系]: 例外が発生しない', async () => {
    const usecase = new GetTaskUseCase(mockTaskQS)
    return expect(usecase.do()).resolves.toBe(undefined)
  })
  it('[異常系]: 例外が発生した場合、例外が発生する', () => {
    const ERROR_MESSAGE = 'error!'
    mockTaskQS.getAll.mockRejectedValueOnce(ERROR_MESSAGE)
    const usecase = new GetTaskUseCase(mockTaskQS)
    return expect(
      usecase.do(),
    ).rejects.toEqual(ERROR_MESSAGE)
  })
})
