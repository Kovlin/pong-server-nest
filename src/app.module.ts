import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PongServerModule } from './pong-server/pong-server.module';

@Module({
  imports: [PongServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
