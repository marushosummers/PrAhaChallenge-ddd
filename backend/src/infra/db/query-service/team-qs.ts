import { PrismaClient } from '@prisma/client'
import { TeamDTO, ITeamQS } from 'src/app/query-service-interface/team-qs'

export class TeamQS implements ITeamQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<TeamDTO[]> {
    const allTeams = await this.prismaClient.team.findMany({
      include: {
        pairs: true,
      },
    })
    return allTeams.map(
      (TeamDM) =>
        new TeamDTO({
          ...TeamDM,
        }),
    )
  }

  public async getById(id: string): Promise<TeamDTO | null> {
    const Team = await this.prismaClient.team.findUnique({
      where: {
        id: id,
      },
      include: {
        pairs: true,
      },
    })
    return Team ? new TeamDTO({ ...Team }) : null
  }

  public async getByName(name: number): Promise<TeamDTO | null> {
    const Team = await this.prismaClient.team.findUnique({
      where: {
        name: name,
      },
      include: {
        pairs: true,
      },
    })
    return Team ? new TeamDTO({ ...Team }) : null
  }
}
