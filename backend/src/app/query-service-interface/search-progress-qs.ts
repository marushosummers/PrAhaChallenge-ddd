export class SearchProgressDTO {
  public readonly id: string
  public readonly taskId: string
  public readonly taskContent: string
  public readonly memberId: string
  public readonly memberName: string
  public readonly taskProgressStatus: string
  public constructor(props: {
    id: string
    taskId: string
    taskContent: string
    memberId: string
    memberName: string
    taskProgressStatus: string
  }) {
    const {
      id,
      taskId,
      taskContent: taskContent,
      memberId,
      memberName,
      taskProgressStatus,
    } = props
    this.id = id
    this.taskId = taskId
    this.taskContent = taskContent
    this.memberId = memberId
    this.memberName = memberName
    this.taskProgressStatus = taskProgressStatus
  }
}
export interface ISearchProgressQS {
  getAll(taskId: string[], status: string): Promise<SearchProgressDTO[]>
  get10records(
    taskId: string[],
    status: string,
    cursor?: string,
  ): Promise<SearchProgressDTO[]>
}
