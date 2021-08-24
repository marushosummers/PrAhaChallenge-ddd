export class Team {
  private id: number
  private name: string

  public constructor(props: { id: number, name: string }) {
    const { id, name } = props
    this.id = id
    this.name = name
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
