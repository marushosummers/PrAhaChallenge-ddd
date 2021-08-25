import { Team } from 'src/domain/entities/Team'
import { createRandomIdString } from 'src/util/random'
import { ITeamRepository } from './repository-interface/team-repository'

export class PostTeamUseCase {
  private readonly teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  public async do(params: { name: string }) {
    const { name } = params

    const teamEntity = new Team({
      id: createRandomIdString(),
      name
    })
    await this.teamRepo.save(teamEntity)
  }
}
