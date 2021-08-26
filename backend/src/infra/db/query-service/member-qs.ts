import { PrismaClient } from '@prisma/client'
import {
  MemberDTO,
  IMemberQS,
} from 'src/app/query-service-interface/member-qs'

export class MemberQS implements IMemberQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<MemberDTO[]> {
    const allTeams = await this.prismaClient.member.findMany()
    return allTeams.map(
      (MemberDM) =>
        new MemberDTO({
          ...MemberDM,
        }),
    )
  }
}
