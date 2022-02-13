import { Team } from 'src/domain/entities/Team'
import { TeamService } from 'src/domain/services/team'
import { ITeamRepository } from './repository-interface/team-repository'
import { ITeamQS } from './query-service-interface/team-qs'


export class MovePairUseCase {
  private readonly teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  public async do(params: { pairId: string, newTeamId: string }): Promise<void> {
    const { pairId, newTeamId } = params

    const teamService = new TeamService(this.teamRepo)

    await teamService.movePair(pairId, newTeamId)
  }
}

