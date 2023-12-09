import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map, pipe } from 'rxjs';

interface MessageEvent {
  data: string | object;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('event')
  sendEvent(): Observable<MessageEvent> {
    // --0 --1--2 -->
    // hwllo 0 -- hwllo 1 --
    return interval(1000).pipe(
      map((num: number) => ({
        data: 'hello' + num,
      })),
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
