export class SearchProgressDTO {
  public readonly id: string
  public readonly taskId: string
  public readonly taskContent: string
  public readonly memberId: string
  public readonly memberName: string
  public readonly status: string
  public constructor(props: { id: string, taskId: string; taskContent: string, memberId: string, memberName: string, status: string }) {
    const { id, taskId, taskContent: taskContent, memberId, memberName, status } = props
    this.id = id
    this.taskId = taskId
    this.taskContent = taskContent
    this.memberId = memberId
    this.memberName = memberName
    this.status = status
  }
}
export interface ISearchProgressQS {
  getAll(taskId: string[], status: string): Promise<SearchProgressDTO[]>
}
