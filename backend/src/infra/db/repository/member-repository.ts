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

  public async save(member: Member): Promise<Member>
  public async save(members: Member[]): Promise<Member[]>
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
          name: memberProps.name,
          email: memberProps.email,
          activityStatus: memberProps.activityStatus
        },
      })

      await Promise.all(member.memberTasks.map(async (task) => {
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
            memberId: memberProps.id,
            taskId: taskProps.taskId,
            progressStatus: taskProps.progressStatus,
          },
        })
      }));

      // NOTE: returnされた値のオブジェクトを返すべき？
      const savedMember  = new Member({
        ...member,
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
}