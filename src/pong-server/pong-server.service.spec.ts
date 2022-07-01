import { Test, TestingModule } from '@nestjs/testing';
import { PongServerService } from './pong-server.service';

describe('PongServerService', () => {
  let service: PongServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PongServerService],
    }).compile();

    service = module.get<PongServerService>(PongServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
