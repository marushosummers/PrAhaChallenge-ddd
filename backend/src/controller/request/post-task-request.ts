// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PostTaskRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly content!: string
}
