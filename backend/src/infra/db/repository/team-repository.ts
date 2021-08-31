import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/app/repository-interface/team-repository'
import { Team } from 'src/domain/entities/Team'

export class TeamRepository implements ITeamRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async update(TeamEntity: Team): Promise<Team> {
    const { id, name } = TeamEntity.getAllProperties()

    const updateTeam = await this.prismaClient.team.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    })
    const savedTeamEntity = new Team({
      id: updateTeam.id,
      name: updateTeam.name
    })
    return savedTeamEntity
  }
}
