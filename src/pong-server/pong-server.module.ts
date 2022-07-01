import { Module } from '@nestjs/common';
import { PongServerService } from './pong-server.service';
import { PongServerGateway } from './pong-server.gateway';

@Module({
  providers: [PongServerGateway, PongServerService]
})
export class PongServerModule {}
