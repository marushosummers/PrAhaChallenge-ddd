import { ITaskRepository } from './repository-interface/task-repository'
import { IMemberRepository } from './repository-interface/member-repository'
import { MemberFactory } from 'src/domain/factory/member'
import { ActivityStatus, Member } from 'src/domain/entities/Member'
import { MemberService } from 'src/domain/services/member'

interface MemberPrams {
  name: string,
  email: string,
}

export class CreateMemberUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly memberRepo: IMemberRepository

  public constructor(memberRepo: IMemberRepository, taskRepo: ITaskRepository) {
    this.memberRepo = memberRepo
    this.taskRepo = taskRepo
  }

  public async do(params: MemberPrams): Promise<Member> {
    const { name, email} = params

    // Email Check
    if (await MemberService.isSameEmailExist(email, this.memberRepo)) {
      throw new Error("There is member with the same name.")
    }

    // Memberの作成
    const member = await MemberFactory.create({ name: name, email: email, taskRepo: this.taskRepo} )
    const result = await this.memberRepo.save(member) as Member

    // TODO: Team, Paitへのアサイン
    // const teamService = new TeamService(this.teamQS, this.teamRepo)
    // const team = await teamService.getMinMemberTeam()
    // team.addMember(member)

    await this.memberRepo.save(member)
    return result
  }
}

