import {Pair } from './Pair'
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

  // TODO: チーム名・ペアの制約を入れる

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      pair: this.pairs
    }
  }
}
