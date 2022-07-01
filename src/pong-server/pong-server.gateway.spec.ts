import { Test, TestingModule } from '@nestjs/testing';
import { PongServerGateway } from './pong-server.gateway';
import { PongServerService } from './pong-server.service';

describe('PongServerGateway', () => {
  let gateway: PongServerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PongServerGateway, PongServerService],
    }).compile();

    gateway = module.get<PongServerGateway>(PongServerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
