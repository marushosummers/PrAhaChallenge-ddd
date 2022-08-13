// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

class PairInput {
  @ApiProperty()
  readonly id!: string

  @ApiProperty()
  readonly name!: string

  @ApiProperty({ type: [String] })
  readonly memberIds!: string[]
}

export class PatchTeamRequest {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly name!: number

  @ApiProperty({ type: [PairInput] })
  readonly pairs!: PairInput[]
}
