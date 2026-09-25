import { Module } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [RealtimeService, ChatGateway],
  exports: [RealtimeService, ChatGateway],
})
export class RealtimeModule {}
