export class PairDTO {
  public readonly id: string
  public readonly name: string
  public readonly members: any
  public constructor(props: { id: string, name: string, members: any }) {
    const { id, name, members } = props
    this.id = id
    this.name = name
    this.members = members
  }
}
// TODO: Team-qsに統合する
export interface IPairQS {
  getAll(): Promise<PairDTO[]>
}
