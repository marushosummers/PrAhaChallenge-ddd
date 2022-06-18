import { Module } from '@nestjs/common'
import { TeamController } from './controller/team.controller'
import { PairController } from './controller/pair.controller'
import { MemberController } from './controller/member.controller'
import { TaskController } from './controller/task.controller'
import { SearchProgressController } from './controller/searchProgress'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [
    TeamController,
    PairController,
    MemberController,
    TaskController,
    SearchProgressController,
  ],
  providers: [],
})
export class AppModule {}
