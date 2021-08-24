import { Module } from '@nestjs/common'
import { SampleController} from './controller/sample/some-data.controller'
import { TeamController } from './controller/team.controller'
// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [SampleController, TeamController],
  providers: [],
})
export class AppModule {}
