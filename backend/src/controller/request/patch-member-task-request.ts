// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { TaskProgressStatus } from 'src/domain/entities/Member'

export class PatchMemberTaskRequest {
  @ApiProperty()
  @IsEnum({ NOTYET: 'NOTYET', REQUESTREVIEW: 'REQUESTREVIEW', DONE: 'DONE' }) // TODO: 型を使いたい
  readonly taskProgressStatus!: TaskProgressStatus
}
