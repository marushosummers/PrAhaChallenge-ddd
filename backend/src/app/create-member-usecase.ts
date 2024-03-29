import { ITaskRepository } from './repository-interface/task-repository'
import { IMemberRepository } from './repository-interface/member-repository'
import { MemberFactory } from 'src/domain/factory/member'
import { Member } from 'src/domain/entities/Member'
import { MemberService } from 'src/domain/services/member'
import { TeamService } from 'src/domain/services/team'
import { ITeamRepository } from './repository-interface/team-repository'

interface MemberPrams {
  name: string
  email: string
}

export class CreateMemberUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly memberRepo: IMemberRepository
  private readonly teamRepo: ITeamRepository

  public constructor(
    memberRepo: IMemberRepository,
    taskRepo: ITaskRepository,
    teamRepo: ITeamRepository,
  ) {
    this.memberRepo = memberRepo
    this.taskRepo = taskRepo
    this.teamRepo = teamRepo
  }

  public async do(params: MemberPrams): Promise<Member> {
    const { name, email } = params

    // Email Check
    if (await MemberService.isSameEmailExist(email, this.memberRepo)) {
      throw new Error('There is member with the same name.')
    }

    // Memberの作成
    const member = await MemberFactory.create({
      name: name,
      email: email,
      taskRepo: this.taskRepo,
    })
    const result = (await this.memberRepo.save(member)) as Member

    // Team, Pairへのアサイン
    const teamService = new TeamService(this.teamRepo)
    const team = await teamService.getMinMemberTeam()
    team.addMember(member.id)

    await this.memberRepo.save(member)
    await this.teamRepo.save(team)
    return result
  }
}
