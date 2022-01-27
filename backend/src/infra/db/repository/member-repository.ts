import { PrismaClient } from '@prisma/client'
import { IMemberRepository } from 'src/app/repository-interface/member-repository'
import { Member, MemberTask } from 'src/domain/entities/Member'
import { TaskProgressStatus } from 'src/domain/entities/Member'

export class MemberRepository implements IMemberRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<Member[]> {
    const allMembers = await this.prismaClient.member.findMany({
      include: {
        memberTasks: {
          include: { task: true },
        },
      }
    })
    return allMembers.map(
      (MemberDM) =>
        new Member({
          id: MemberDM.id,
          name: MemberDM.name,
          email: MemberDM.email,
          activityStatus: MemberDM.activityStatus,
          memberTasks: MemberDM?.memberTasks.map((task) => {
            return new MemberTask({
              id: task.id,
              taskId: task.taskId,
              progressStatus: task.progressStatus as TaskProgressStatus // NOTE: これはasの処理でいいのか？
            })
          })
        })
    )
  }

  public async getById(id: string): Promise<Member | null> {
    const member = await this.prismaClient.member.findUnique({
      where: {
        id: id
      },
      include: {
        pair: true,
      }
    })

    const memberTasks = await this.prismaClient.memberTask.findMany({
      where: {
        memberId: id
      }
    })

    return member ?
      new Member({
        id: member.id,
        name: member.name,
        email: member.email,
        activityStatus: member.activityStatus,
        memberTasks: memberTasks.map((task) => {
          return new MemberTask({
            id: task.id,
            taskId: task.taskId,
            progressStatus: task.progressStatus as TaskProgressStatus // NOTE: これはasの処理でいいのか？
          })
        })
      }):null
  }

  public async save(members: Member | Member[]): Promise<Member | Member[]> {
    if (members instanceof Member) {
      members = [members]
    }

    const savedMembers: Member[] = await Promise.all(members.map(async (member) => {

      const memberProps = member.getAllProperties()

      await this.prismaClient.member.upsert({
        where: {
          id: memberProps.id
        },
        update: {
          name: memberProps.name,
          email: memberProps.email,
          activityStatus: memberProps.activityStatus
        },
        create: {
          id: memberProps.id,
          name: memberProps.name,
          email: memberProps.email,
          activityStatus: memberProps.activityStatus
        },
      })

      await Promise.all(member.getAllProperties().memberTasks.map(async (task) => {
        const taskProps = task.getAllProperties()
        await this.prismaClient.memberTask.upsert({
          where: {
            id: taskProps.id,
          },
          update: {
            memberId: memberProps.id,
            taskId: taskProps.taskId,
            progressStatus: taskProps.progressStatus,
          },
          create: {
            id: taskProps.id,
            memberId: memberProps.id,
            taskId: taskProps.taskId,
            progressStatus: taskProps.progressStatus,
          },
        })
      }));

      // NOTE: returnされた値のオブジェクトを返すべき？
      const savedMember  = new Member({
        ...member.getAllProperties(),
      })
      return savedMember
    }))
    return savedMembers
  }

  public async deleteById(id: string): Promise<void> {
    const deleteMemberTasks = this.prismaClient.memberTask.deleteMany({ where: { memberId: id } })
    const deleteMember = this.prismaClient.member.delete({ where: { id: id } })
    await this.prismaClient.$transaction([deleteMemberTasks, deleteMember])
  }
  public async deleteMemberTasksByTaskId(taskId: string): Promise<void> {
    await this.prismaClient.memberTask.deleteMany({ where: { taskId: taskId } })
  }

}
