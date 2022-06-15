import { PairFactory } from "../factory/team"
import { Member } from "./Member"

export class Team {
  public readonly id: string
  private name: number
  private pairs: Pair[]
  public readonly MIN_MEMBER = 3

  public constructor(props: { id: string, name: number, pairs: Pair[] }) {
    const { id, name, pairs } = props
    this.validateName(name)

    this.id = id
    this.name = name
    this.pairs = pairs
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      pairs: this.pairs
    }
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name
  }

  public getPair(pairId: string) {
    const pair = this.pairs.find(pair => pair.id === pairId)
    if (!pair) {
      throw new Error("Not Found.")
    }
    return pair
  }

  public setName(name: number) {
    this.validateName(name)
    this.name = name
  }

  private validateName(name: number): void {
    if (!(Number.isInteger(name) && 0 <= name && name <= 999)) {
      throw new Error("Team name should be an integer of 3 characters or less.");
    }
  };

  private validateTeamMemberCount(): void {
    const memberCount = this.getMemberCount()
    if (!(memberCount >= this.MIN_MEMBER)) {
      throw new Error("Team should have at least 3 members.");
    }
  };

  private validatePairMemberCount(): void {
    this.pairs.forEach(pair => {
      pair.validateMemberCount()
    })
  };

  public isMemberDeletable(): boolean {
    return this.getMemberCount() > this.MIN_MEMBER
  }

  public addMember(memberId: string): Pair {
    const pair = this.getMinMemberPair()

    // NOTE: 参加できるペアがなければ再編成
    if (!pair.isJoinable()) {
      this.dividePair(pair)
      return this.addMember(memberId)
    }

    pair.addMember(memberId)

    //Team/Pairの人数validation
    this.validatePairMemberCount()
    this.validateTeamMemberCount()

    // NOTE: memberが参加したpairを返す
    return pair
  }

  public deleteMember(memberId: string): void {
    const pair = this.getPairByMemberId(memberId)
    if (!pair) {
      throw new Error("Not Found.")
    }

    // Pairが成立しない場合は再構成を行う
    if (pair.getMemberCount() === pair.MIN_MEMBER) {
      const moveMemberIds = pair.getAllProperties().memberIds.filter(id => id !== memberId)
      this.deletePair(pair.id)

      const newPair = this.getMinMemberPair()
      moveMemberIds.forEach((memberId) => { newPair.addMember(memberId) })
    }

    pair.deleteMember(memberId)

    //Team/Pairの人数validation
    this.validatePairMemberCount()
    this.validateTeamMemberCount()
  }

  public addPair = (pair: Pair): void => {
    // TODO: ペア名の衝突バリデーション
    this.pairs.push(pair)
  }

  public deletePair = (pairId: string): void => {
    // NOTE: testがしにくくなってる？
    this.pairs = this.pairs.filter(pair => pair.id !== pairId)
    this.validateTeamMemberCount()
  }

  public getPairCount = (): number => {
    return this.pairs.length;
  }

  public getMemberCount = (): number => {
    return this.pairs.reduce((prev, current) => prev + current.getAllProperties().memberIds.length, 0);
  }

  public getMinMemberPair(): Pair {
    return this.pairs.reduce((prev, current) => ((prev.getMemberCount() < current.getMemberCount()) ? prev : current));
  }

  public getPairByMemberId(memberId: string): Pair | undefined {
    return this.pairs.find((pair) => pair.isMemberExist(memberId))
  }

  public getJoinablePair(): Pair | undefined {
    return this.pairs.find((pair) => pair.isJoinable())
  }

  public dividePair(pair: Pair): Pair[] {
    const moveMemberIds: string[] = pair.getAllProperties().memberIds.splice(pair.MIN_MEMBER - 1);

    moveMemberIds.forEach((memberId) => { pair.deleteMember(memberId) })

    const newPair = PairFactory.create({ team: this, memberIds: moveMemberIds })

    this.addPair(newPair)

    return [pair, newPair]
  }

  public joinOtherTeam = (destinationTeam: Team): Team => {
    const pairs = this.getAllProperties().pairs;
    const newPairs: Pair[] = pairs.map(pair => PairFactory.create({ team: destinationTeam, memberIds: pair.getAllProperties().memberIds }))

    newPairs.forEach(pair => destinationTeam.addPair(pair));

    return destinationTeam
  };
}

export class Pair {
  public readonly id: string
  public readonly name: string
  private memberIds: string[]
  public readonly MIN_MEMBER = 2
  public readonly MAX_MEMBER = 3

  public constructor(props: { id: string, name: string, memberIds: string[] }) {
    const { id, name, memberIds } = props

    this.validateName(name)

    this.id = id
    this.name = name
    this.memberIds = memberIds

    this.validateMemberCount()
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      memberIds: this.memberIds
    }
  }

  private validateName(name: string): void {
    if (!new RegExp("^[a-z]$").test(name)) {
      throw new Error("Team name should be a lowercase alphabet.");
    }
  }

  public validateMemberCount(): void {
    const memberCount = this.getMemberCount()
    if (memberCount < this.MIN_MEMBER || this.MAX_MEMBER < memberCount) {
      throw new Error(`Team should have between ${this.MIN_MEMBER} and ${this.MAX_MEMBER} members.`);
    }
  }

  public addMember(memberId: string): void {
    this.memberIds.push(memberId)
  }

  public deleteMember(memberId: string): void {
    this.memberIds = this.memberIds.filter(id => id !== memberId)
  }

  public getMemberCount(): number {
    return this.memberIds.length;
  }

  public isJoinable = (): boolean => {
    return this.memberIds.length < this.MAX_MEMBER
  }

  public isMemberExist = (memberId: string): boolean => {
    return this.memberIds.includes(memberId)
  }
}
