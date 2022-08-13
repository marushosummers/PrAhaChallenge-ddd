import { IMemberRepository } from './repository-interface/member-repository'
import { ITeamRepository } from './repository-interface/team-repository'
import { Member, ActivityStatus } from 'src/domain/entities/Member'
import { MemberService } from 'src/domain/services/member'
import { TeamService } from 'src/domain/services/team'

interface MemberPrams {
  id: string
  name: string
  email: string
  activityStatus: ActivityStatus
}

export class UpdateMemberUseCase {
  private readonly memberRepo: IMemberRepository
  private readonly teamRepo: ITeamRepository

  public constructor(memberRepo: IMemberRepository, teamRepo: ITeamRepository) {
    this.memberRepo = memberRepo
    this.teamRepo = teamRepo
  }

  public async do(params: MemberPrams): Promise<Member> {
    const { id, name, email, activityStatus } = params

    const member = await this.memberRepo.getById(id)

    if (!member) {
      throw new Error('Not Found.')
    }

    // Email Check
    if (member.getAllProperties().email === email) {
      // Email will not be updated.
      // Skip Email Check.
    } else if (await MemberService.isSameEmailExist(email, this.memberRepo)) {
      throw new Error('Email is already used.')
    }

    member.setName(name)
    member.setEmail(email)

    // 在籍ステータスの変更
    if (member.getAllProperties().activityStatus === activityStatus) {
      // 変更がない場合はスキップ
    } else if (activityStatus === "ONGOING") {
      // ステータスをONGOINGに変更し、ペアに追加する
      member.setActivityStatus(activityStatus)

      const teamService = new TeamService(this.teamRepo)
      const team = await teamService.getMinMemberTeam()
      team.addMember(member.id)

      await this.teamRepo.save(team)

    } else if (activityStatus === "LEFT" || activityStatus === "RECESS") {
      // ステータスを変更し、ペアから抜ける
      member.setActivityStatus(activityStatus)

      const team = await this.teamRepo.getByMemberId(member.id)
      if (!team) {throw new Error('Not Found.')}

      // Team, Pairから抜けられるかチェックする
      if (team.isMemberDeletable()) {
        team.deleteMember(member.id)

        await this.memberRepo.remove(member.id)
        await this.teamRepo.save(team)
      } else {
        const teamService = new TeamService(this.teamRepo)
        const newTeam = await teamService.breakup(team)
        newTeam.deleteMember(member.id)

        await this.memberRepo.remove(member.id)
        await this.teamRepo.save(newTeam)
      }

    } else {
      throw new Error('Invalid Activity Status.')
    }

    const savedMember = (await this.memberRepo.save(member)) as Member

    return savedMember
  }
}
