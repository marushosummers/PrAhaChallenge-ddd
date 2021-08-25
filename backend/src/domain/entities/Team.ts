export class Team {
  private id: string
  private name: number
  private pairs?: Pair[]

  public constructor(props: { id: string, name: number, pairs?: Pair[] }) {
    const { id, name, pairs } = props
    this.id = id
    this.name = name
    this.pairs = pairs
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      pair: this.pairs
    }
  }
}

class Pair {
  private id: string
  private name: string

  public constructor(props: { id: string, name: string }) {
    const { id, name } = props
    this.id = id
    this.name = name
  }
}
