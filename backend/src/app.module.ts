import { Module } from '@nestjs/common'
import { TeamController } from './controller/team.controller'
import { PairController } from './controller/pair.controller'
import { MemberController } from './controller/member.controller'
import { TaskController } from './controller/task.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [TeamController, PairController, MemberController, TaskController],
  providers: [],
})
export class AppModule {}
