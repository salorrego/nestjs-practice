import { Module } from '@nestjs/common';
import { AppController } from './entrypoint/api/app.controller';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
