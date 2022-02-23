import { IMemberRepository } from './repository-interface/member-repository'
import { Member } from 'src/domain/entities/Member'
import { TeamService } from 'src/domain/services/team'
import { ITeamRepository } from './repository-interface/team-repository'
import { Team } from 'src/domain/entities/Team'

export class DeleteMemberUseCase {
  private readonly memberRepo: IMemberRepository
  private readonly teamRepo: ITeamRepository

  public constructor(memberRepo: IMemberRepository, teamRepo: ITeamRepository) {
    this.memberRepo = memberRepo
    this.teamRepo = teamRepo
  }

  public async do(params: { id: string }): Promise<Member> {
    const { id } = params
    const member = await this.memberRepo.getById(id)

    if (!member) {
      throw new Error("Not Found.");
    } else {
      // TODO: Pairから抜ける処理を入れる
      const team: Team = await this.teamRepo.getByMemberId(member.id)

      if (team.isMemberDeletable(member.id)) {
        team.deleteMember(member.id)
        await this.teamRepo.save(team);
      } else {
        const teamService = new TeamService(this.teamRepo)
        const newTeam = await teamService.breakup(team)
        newTeam.deleteMember(member.id)
        await this.teamRepo.save(newTeam);
      }

      await this.memberRepo.deleteById(member.getAllProperties().id);
      return member
    }
  }
}

