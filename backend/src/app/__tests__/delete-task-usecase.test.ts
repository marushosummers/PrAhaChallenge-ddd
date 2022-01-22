import * as faker from 'faker'
import { PrismaClient } from '@prisma/client'
import { Task } from 'src/domain/entities/Task'
import { Member, MemberTask } from 'src/domain/entities/Member'
import { CreateTaskUseCase } from '../create-task-usecase'
import { TaskRepository } from '../../infra/db/repository/task-repository'
import { MemberRepository } from 'src/infra/db/repository/member-repository'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { DeleteTaskUseCase } from '../delete-task-usecase'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/task-repository.ts')
jest.mock('src/infra/db/repository/member-repository.ts')

describe('do', () => {
  describe('OK', () => {
    let mockTaskRepository: MockedObjectDeep<TaskRepository>
    let mockMemberRepository: MockedObjectDeep<MemberRepository>
    let mockTask: MockedObjectDeep<Task>
    let mockMember: MockedObjectDeep<Member>
    beforeAll(() => {
      const prisma = new PrismaClient()
      mockTaskRepository = mocked(new TaskRepository(prisma), true)
      mockMemberRepository = mocked(new MemberRepository(prisma), true)
    })
    it('例外が発生しない', async () => {
      const taskId = faker.datatype.uuid();
      const content = "testContent"
      const memberId = faker.datatype.uuid();
      const name = "testMemberName"
      const email = faker.internet.email()
      const activityStatus = "ONGOING"
      const memberTasks: MemberTask[] = []
      const expectedReponse = new Task({ id: taskId, content: content })

      mockTask = mocked(new Task({ id: taskId, content: content}), true)
      mockMember = mocked(new Member({ id: memberId, name: name, email: email, activityStatus: activityStatus, memberTasks: memberTasks}), true)
      mockTaskRepository.getById.mockResolvedValueOnce(mockTask)

      const usecase = new DeleteTaskUseCase(mockTaskRepository, mockMemberRepository)
      await expect(usecase.do({ id: taskId })).resolves.toEqual(mockTask)
      expect(mockMemberRepository.deleteMemberTasksByTaskId).toHaveBeenCalled()
      expect(mockTaskRepository.deleteById).toHaveBeenCalled()
    })
  })
})
