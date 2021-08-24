import { PrismaClient } from '@prisma/client'
import {
  TeamDTO,
  ITeamQS,
} from 'src/app/sample/query-service-interface/some-data-qs'

export class TeamQS implements ITeamQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<TeamDTO[]> {
    const allTeams = await this.prismaClient.team.findMany()
    return allTeams.map(
      (TeamDM) =>
        new TeamDTO({
          ...TeamDM,
        }),
    )
  }
}
