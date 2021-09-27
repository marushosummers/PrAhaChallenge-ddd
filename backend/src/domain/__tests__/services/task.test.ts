import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { TaskService } from 'src/domain/services/task';
import { TaskQS } from 'src/infra/db/query-service/task-qs';
import { ITaskRepository } from 'src/app/repository-interface/task-repository';
import { PrismaClient } from '.prisma/client';

jest.mock('@prisma/client')
jest.mock("src/infra/db/query-service/task-qs")
jest.mock("src/app/repository-interface/task-repository")


describe('isExist', () => {
  let mockITaskRepository: MockedObjectDeep<ITaskRepository>
  const prisma = new PrismaClient()
  const mockTaskQS = mocked(new TaskQS(prisma), true)

  it('正常系', async () => {
    const id = "testId"
    const taskService = new TaskService(mockITaskRepository, mockTaskQS)

    expect(taskService.isExist(id)).resolves.toBeInstanceOf(Boolean)
    expect(mockTaskQS.getById).toHaveBeenCalled()
  })
})

