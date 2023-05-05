import { Controller, Get } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Controller('ping')
export class AppController {
  constructor(private readonly logger: Logger) {}

  @Get()
  ping(): string {
    this.logger.log(`AppController: Ping API called`)
    return "Up and running!";
  }
}
