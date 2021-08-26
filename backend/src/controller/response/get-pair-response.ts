import { ApiProperty } from '@nestjs/swagger'
import { PairDTO } from 'src/app/query-service-interface/pair-qs'

export class GetPairResponse {
  @ApiProperty({ type: () => [Pair] })  pairs: Pair[]

  public constructor(params: { pairs: PairDTO[] }) {
    const { pairs } = params
    this.pairs = pairs.map(({ id, name, members }) => {
      return new Pair({
        id: id,
        name: name,
        members: members,
      })
    })
  }
}

class Pair {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  members: any

  public constructor(params: {
    id: string
    name: string
    members: any
  }) {
    this.id = params.id
    this.name = params.name
    this.members = params.members
  }
}
