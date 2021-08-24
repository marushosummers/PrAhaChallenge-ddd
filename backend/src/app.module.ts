import { Module } from '@nestjs/common'
import { TeamController } from './controller/team.controller'
// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [TeamController],
  providers: [],
})
export class AppModule {}
