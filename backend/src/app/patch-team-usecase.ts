import { Team } from 'src/domain/entities/Team'
import { TeamService } from 'src/domain/services/team'
import { ITeamRepository } from './repository-interface/team-repository'
import { ITeamQS } from './query-service-interface/team-qs'


export class PatchTeamUseCase {
  private readonly teamRepo: ITeamRepository
  private readonly teamQS: ITeamQS
  public constructor(teamRepo: ITeamRepository, teamQS: ITeamQS) {
    this.teamRepo = teamRepo
    this.teamQS = teamQS
  }
  public async do(params: { id: string, name: number }) {
    const { id, name } = params

    const teamEntity = new Team({
      id,
      name
    })
    const teamService = new TeamService(this.teamQS)
    if (await teamService.isSameNameExist(name)) {
      throw new Error
    }
    const result = await this.teamRepo.update(teamEntity)
    return result
  }
}

