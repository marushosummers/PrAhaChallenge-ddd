import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/app/repository-interface/team-repository'
import { Team } from 'src/domain/entities/Team'

export class TeamRepository implements ITeamRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(TeamEntity: Team): Promise<Team> {
    const { id, name } = TeamEntity.getAllProperties()

    const savedTeamDatamodel = await this.prismaClient.team.create({
      data: {
        id,
        name,
      },
    })
    const savedTeamEntity = new Team({
      ...savedTeamDatamodel,
    })
    return savedTeamEntity
  }
}
