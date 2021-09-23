import { PrismaClient } from '@prisma/client'
import {
  MemberDTO,
  IMemberQS,
  MemberDetailDTO,
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


  public async getById(id: string): Promise<MemberDetailDTO | null> {
    const member = await this.prismaClient.member.findUnique({
      where: {
        id: id
      },
      include: {
        pair: true,
      }
    })

    const memberTasks = await this.prismaClient.task.findMany({
      select: {
        id: true,
        memberTasks: {
          select: {
            id: true,
            memberId: true,
            progressStatus: true,
          },
          where: {
            memberId: id
          }
        },
      }
    })

    console.log(memberTasks)

    return member ?
      new MemberDetailDTO({
        id: member.id,
        name: member.name,
        email: member.email,
        activityStatus: member.activityStatus,
        pair: member.pair,
        tasks: memberTasks.map((task) => {
          return {
            id: task.id,
            memberTaskId: task.memberTasks[0] ? task.memberTasks[0].id : undefined,
            progressStatus: task.memberTasks[0] ? task.memberTasks[0].progressStatus : "NOTYET",
          }
        })
      }) : null
  }
}
