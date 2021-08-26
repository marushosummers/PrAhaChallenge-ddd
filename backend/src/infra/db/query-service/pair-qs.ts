import { PrismaClient } from '@prisma/client'
import {
  PairDTO,
  IPairQS,
} from 'src/app/query-service-interface/pair-qs'

export class PairQS implements IPairQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<PairDTO[]> {
    const allTeams = await this.prismaClient.pair.findMany({
      include: {
        members: true
      }
    })
    return allTeams.map(
      (PairDM) =>
        new PairDTO({
          ...PairDM,
        }),
    )
  }
}
