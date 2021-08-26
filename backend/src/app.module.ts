import { Module } from '@nestjs/common'
import { TeamController } from './controller/team.controller'
import { PairController } from './controller/pair.controller'
// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [TeamController, PairController],
  providers: [],
})
export class AppModule {}
