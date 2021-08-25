export class TeamDTO {
  public readonly id: string
  public readonly name: Number
  public constructor(props: { id: string, name: Number }) {
    const { id, name } = props
    this.id = id
    this.name = name
  }
}
export interface ITeamQS {
  getAll(): Promise<TeamDTO[]>
}
