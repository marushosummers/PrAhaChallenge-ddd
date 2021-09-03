export class TeamDTO {
  public readonly id: string
  public readonly name: number
  public readonly pairs: any
  public constructor(props: { id: string, name: number, pairs: any }) {
    const { id, name, pairs } = props
    this.id = id
    this.name = name
    this.pairs = pairs
  }
}
export interface ITeamQS {
  getAll(): Promise<TeamDTO[]>
  getById(id: string): Promise<TeamDTO | null>
  getByName(name: number): Promise<TeamDTO | null>
}
