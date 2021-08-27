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
    const allTeams = await this.prismaClient.member.findMany({
      include: {
        pair: true,
        memberTasks:　{
          include: { task: true },
        },
      }
    })
    return allTeams.map(
      (MemberDM) =>
        new MemberDTO({
          id: MemberDM.id,
          name: MemberDM.name,
          email: MemberDM.email,
          activityStatus: MemberDM.activityStatus,
          pair: MemberDM.pair,
          tasks: MemberDM?.memberTasks.map((task) => {
            return {
              id: task.id,
              taskId: task.taskId,
              content: task.task.content,
              progressStatus: task.progressStatus
            }})
        }),
    )
  }
}
