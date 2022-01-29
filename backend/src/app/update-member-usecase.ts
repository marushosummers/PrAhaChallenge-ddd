import { IMemberRepository } from './repository-interface/member-repository'
import { Member, ActivityStatus } from 'src/domain/entities/Member'
import { MemberService } from 'src/domain/services/member'

interface MemberPrams {
  id: string,
  name: string,
  email: string,
  activityStatus: ActivityStatus,
}

export class UpdateMemberUseCase {
  private readonly memberRepo: IMemberRepository

  public constructor(memberRepo: IMemberRepository) {
    this.memberRepo = memberRepo
  }

  public async do(params: MemberPrams): Promise<Member> {
    const { id, name, email, activityStatus } = params

    const member = await this.memberRepo.getById(id)

    if (!member) {
      throw new Error("Not Found.")
    }

    if (await MemberService.isSameEmailExist(member, email, this.memberRepo)) {
      throw new Error("Email is already used.")
    }

    member.setName(name)
    member.setEmail(email)
    // TODO: Pairの制約を入れる
    member.setActivityStatus(activityStatus)

    const savedMember = await this.memberRepo.save(member) as Member

    return savedMember
  }
}

