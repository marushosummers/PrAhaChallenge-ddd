import * as faker from 'faker'
import { PrismaClient } from '@prisma/client'
import { Member, MemberTask } from 'src/domain/entities/Member'
import { MemberRepository } from 'src/infra/db/repository/member-repository'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { DeleteMemberUseCase } from '../delete-member-usecase'
import { TeamRepository } from 'src/infra/db/repository/team-repository'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/task-repository.ts')
jest.mock('src/infra/db/repository/member-repository.ts')

describe('do', () => {
  describe('OK', () => {
    let mockMemberRepository: MockedObjectDeep<MemberRepository>
    let mockTeamRepository: MockedObjectDeep<TeamRepository>
    let mockMember: MockedObjectDeep<Member>
    beforeAll(() => {
      const prisma = new PrismaClient()
      mockMemberRepository = mocked(new MemberRepository(prisma), true)
      mockTeamRepository = mocked(new TeamRepository(prisma), true)
    })
    it('例外が発生しない', async () => {
      const memberId = faker.datatype.uuid()
      const name = 'testMemberName'
      const email = faker.internet.email()
      const activityStatus = 'ONGOING'
      const memberTasks: MemberTask[] = []

      mockMember = mocked(
        new Member({
          id: memberId,
          name: name,
          email: email,
          activityStatus: activityStatus,
          memberTasks: memberTasks,
        }),
        true,
      )
      mockMemberRepository.getById.mockResolvedValueOnce(mockMember)

      const usecase = new DeleteMemberUseCase(
        mockMemberRepository,
        mockTeamRepository,
      )
      await expect(usecase.do({ id: memberId })).resolves.toEqual(mockMember)
      expect(mockMemberRepository.deleteById).toHaveBeenCalled()
    })
  })
})
