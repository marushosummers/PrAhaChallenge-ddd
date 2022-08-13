// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

class PairInput {
  @ApiProperty()
  readonly id!: string

  @ApiProperty()
  readonly name!: string

  @ApiProperty({ type: [String] })
  readonly memberIds!: string[]
}

export class PatchTeamRequest {
  @ApiProperty({ type: [PairInput] })
  @IsNotEmpty()
  readonly pairs!: PairInput[]
}
