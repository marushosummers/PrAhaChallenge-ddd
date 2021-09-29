import { ActivityStatus, Member, MemberTask } from 'src/domain/entities/Member'
import { MemberFactory } from 'src/domain/factory/member'
import { MemberService } from 'src/domain/services/member'
import { IMemberRepository } from './repository-interface/member-repository'
import { IMemberQS } from './query-service-interface/member-qs'
import { ITeamRepository } from './repository-interface/team-repository'
import { ITeamQS } from './query-service-interface/team-qs'
import { TeamService } from 'src/domain/services/team'


export class PostMemberUseCase {
  private readonly teamRepo: ITeamRepository
  private readonly teamQS: ITeamQS
  private readonly memberRepo: IMemberRepository
  private readonly memberQS: IMemberQS
  public constructor(teamRepo: ITeamRepository, memberRepo: IMemberRepository, teamQS: ITeamQS, memberQS: IMemberQS) {
    this.teamRepo = teamRepo
    this.memberRepo = memberRepo
    this.teamQS = teamQS
    this.memberQS = memberQS
  }

  public async do(params: {name: string, email: string, activityStatus: ActivityStatus, memberTasks: MemberTask[] }) {
    const memberService = new MemberService(this.memberQS)
    if (await memberService.isSameEmailExist(params.email)) {
      throw new Error("There is member with the same name.")
    }

    const teamService = new TeamService(this.teamQS, this.teamRepo)
    const team = await teamService.getMinMemberTeam()

    const member = MemberFactory.create({ ...params })
    team.addMember(member)

    await this.memberRepo.create(member)
    await this.teamRepo.save(team)

    const newMemberDTO = await this.memberQS.getById(member.id)
    return newMemberDTO
  }
}

