// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsEmail } from 'class-validator'
import { ActivityStatus } from 'src/domain/entities/Member'

export class PutMemberRequest {
  @ApiProperty()
  readonly name!: string

  @ApiProperty()
  @IsEmail()
  readonly email!: string

  @ApiProperty()
  @IsEnum({ ONGOING: 'ONGOING', RECESS:  'RECESS', LEFT: 'LEFT' }) // TODO: 型を使いたい
  readonly activityStatus!: ActivityStatus
}
