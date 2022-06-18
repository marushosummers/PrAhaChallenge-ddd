import { mocked } from 'ts-jest/utils'
import { TaskService } from 'src/domain/services/task'
import { TaskQS } from 'src/infra/db/query-service/task-qs'
import { PrismaClient } from '.prisma/client'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/task-qs')
jest.mock('src/app/repository-interface/task-repository')

describe('isExist', () => {
  const prisma = new PrismaClient()
  const mockTaskQS = mocked(new TaskQS(prisma), true)

  it('正常系', async () => {
    const id = 'testId'
    const taskService = new TaskService(mockTaskQS)

    await expect(taskService.isExist(id)).resolves.toEqual(false)
    expect(mockTaskQS.getById).toHaveBeenCalled()
  })
})
