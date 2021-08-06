import { Module } from '@nestjs/common'
import { SampleController, Sample2Controller } from './controller/sample/some-data.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [SampleController, Sample2Controller],
  providers: [],
})
export class AppModule {}
