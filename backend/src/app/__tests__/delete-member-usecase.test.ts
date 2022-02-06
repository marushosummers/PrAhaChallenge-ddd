import * as faker from 'faker'
import { PrismaClient } from '@prisma/client'
import { Task } from 'src/domain/entities/Task'
import { Member, MemberTask } from 'src/domain/entities/Member'
import { CreateTaskUseCase } from '../create-task-usecase'
import { TaskRepository } from '../../infra/db/repository/task-repository'
import { MemberRepository } from 'src/infra/db/repository/member-repository'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { DeleteMemberUseCase } from '../delete-member-usecase'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/task-repository.ts')
jest.mock('src/infra/db/repository/member-repository.ts')

describe('do', () => {
  describe('OK', () => {
    let mockMemberRepository: MockedObjectDeep<MemberRepository>
    let mockMember: MockedObjectDeep<Member>
    beforeAll(() => {
      const prisma = new PrismaClient()
      mockMemberRepository = mocked(new MemberRepository(prisma), true)
    })
    it('例外が発生しない', async () => {
      const memberId = faker.datatype.uuid();
      const name = "testMemberName"
      const email = faker.internet.email()
      const activityStatus = "ONGOING"
      const memberTasks: MemberTask[] = []

      mockMember = mocked(new Member({ id: memberId, name: name, email: email, activityStatus: activityStatus, memberTasks: memberTasks}), true)
      mockMemberRepository.getById.mockResolvedValueOnce(mockMember)

      const usecase = new DeleteMemberUseCase(mockMemberRepository)
      await expect(usecase.do({ id: memberId })).resolves.toEqual(mockMember)
      expect(mockMemberRepository.deleteById).toHaveBeenCalled()
    })
  })
})
