import { Pair, Team } from '../entities/Team'
import { createRandomIdString } from '../../util/random'

export class PairFactory {
  public static create = (params: {
    team: Team
    memberIds: string[]
  }): Pair => {
    const { team, memberIds } = params
    const name = PairFactory.getNewPairName(team)
    return new Pair({
      id: createRandomIdString(),
      name: name,
      memberIds: memberIds,
    })
  }

  public static getNewPairName = (team: Team): string => {
    const alphabets: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const usedNames: string[] = team
      .getAllProperties()
      .pairs.map((pair) => pair.name)
    const candidateNames: string[] = alphabets.filter(
      (alphabet) => !usedNames.includes(alphabet),
    )
    console.log(usedNames)
    console.log(candidateNames)

    if (!candidateNames.length) {
      throw new Error('All alphabet is already used')
    }
    return candidateNames[0] as string // TODO: asやめる
  }
}
