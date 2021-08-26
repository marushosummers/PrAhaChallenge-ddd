import { Module } from '@nestjs/common'
import { TeamController } from './controller/team.controller'
import { PairController } from './controller/pair.controller'
import { MemberController } from './controller/member.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [TeamController, PairController, MemberController],
  providers: [],
})
export class AppModule {}
