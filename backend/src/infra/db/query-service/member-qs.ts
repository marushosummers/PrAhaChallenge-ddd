import { PrismaClient } from '@prisma/client'
import e from 'express'
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
    const allMembers = await this.prismaClient.member.findMany({
      include: {
        pair: true,
        memberTasks:　{
          include: { task: true },
        },
      }
    })
    return allMembers.map(
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

  public async getByEmail(email: string): Promise<MemberDTO | null> {
    const member = await this.prismaClient.member.findUnique({
      where: {
        email: email
      },
      include: {
        pair: true,
        memberTasks:　{
          include: { task: true },
        },
      }
    })
    return member ?
        new MemberDTO({
          id: member.id,
          name: member.name,
          email: member.email,
          activityStatus: member.activityStatus,
          pair: member.pair,
          tasks: member?.memberTasks.map((task) => {
            return {
              id: task.id,
              taskId: task.taskId,
              content: task.task.content,
              progressStatus: task.progressStatus
            }})
        }) : null
  }
}
