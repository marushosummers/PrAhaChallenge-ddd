import { PrismaClient } from '@prisma/client'
import {
  SearchProgressDTO,
  ISearchProgressQS,
} from 'src/app/query-service-interface/search-progress-qs'

export class SearchProgressQS implements ISearchProgressQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(taskids: string[], progress: string): Promise<SearchProgressDTO[]> {
    const allSearchProgresss = await this.prismaClient.memberTask.findMany({
      include: {
        task: true,
        member: true
      },
      where: {
        AND: {
          taskId: {
            in: taskids,
          },
          progressStatus: {
            equals: progress,
          },
        },
      },
    })
    console.log(allSearchProgresss)
    return allSearchProgresss.map(
      (SearchProgressDM) =>
        new SearchProgressDTO({
          id: SearchProgressDM.id,
          taskId: SearchProgressDM.task.id,
          taskContent: SearchProgressDM.task.content,
          status: SearchProgressDM.progressStatus,
          memberId: SearchProgressDM.member.id,
          memberName: SearchProgressDM.member.name
        }),
    )
  }
}
