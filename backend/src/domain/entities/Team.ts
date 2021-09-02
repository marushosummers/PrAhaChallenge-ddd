import { Pair } from './Pair'
export class Team {
  private id: string
  private name: number
  private pairs?: Pair[]

  public constructor(props: { id: string, name: number, pairs?: Pair[] }) {
    const { id, name, pairs } = props
    this.validateName(name)

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

  public getId() {
    return this.id
  }

  public getName() {
    return this.name
  }

  private validateName(name: number): void {
    if (!(Number.isInteger(name) && 0 <= name && name <= 999)) {
      throw new Error("Team name should be an integer of 3 characters or less.");
    }
  };
}
