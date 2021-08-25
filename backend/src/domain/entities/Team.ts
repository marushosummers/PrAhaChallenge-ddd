export class Team {
  private id: string
  private name: string

  public constructor(props: { id: string, name: string }) {
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
