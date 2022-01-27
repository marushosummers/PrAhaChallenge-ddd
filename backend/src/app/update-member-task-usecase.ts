import { IMemberRepository } from './repository-interface/member-repository'
import { Member, TaskProgressStatus } from 'src/domain/entities/Member'

interface MemberTaskPrams {
  id: string,
  memberTaskId: string,
  status: TaskProgressStatus,
}

export class UpdateMemberTaskUseCase {
  private readonly memberRepo: IMemberRepository

  public constructor(memberRepo: IMemberRepository) {
    this.memberRepo = memberRepo
  }

  public async do(params: MemberTaskPrams): Promise<Member> {
    const { id, memberTaskId, status } = params

    const member = await this.memberRepo.getById(id)

    if (!member) {
      throw new Error("Not Found.")
    }

    member.updateTaskProgressStatus(memberTaskId, status)

    const savedMember = await this.memberRepo.save(member) as Member

    return savedMember
  }
}

