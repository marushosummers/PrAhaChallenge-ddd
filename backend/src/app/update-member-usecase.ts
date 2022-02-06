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

    // Email Check
    if (member.getAllProperties().email === email) {
      // Email will not be updated.
      // Skip Email Check.
    } else if (await MemberService.isSameEmailExist(email, this.memberRepo)) {
      throw new Error("Email is already used.")
    }

    member.setName(name)
    member.setEmail(email)

    // TODO: 在籍ステータスによってPairから抜ける/入るの制約を入れる
    member.setActivityStatus(activityStatus)

    const savedMember = await this.memberRepo.save(member) as Member

    return savedMember
  }
}

