import { Injectable } from '@nestjs/common';
import { CreatePongServerDto } from './dto/create-pong-server.dto';
import { UpdatePongServerDto } from './dto/update-pong-server.dto';

@Injectable()
export class PongServerService {
  create(createPongServerDto: CreatePongServerDto) {
    return 'This action adds a new pongServer';
  }

  findAll() {
    return `This action returns all pongServer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pongServer`;
  }

  update(id: number, updatePongServerDto: UpdatePongServerDto) {
    return `This action updates a #${id} pongServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} pongServer`;
  }
}
