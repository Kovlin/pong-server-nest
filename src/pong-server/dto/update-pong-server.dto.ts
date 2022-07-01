import { PartialType } from '@nestjs/mapped-types';
import { CreatePongServerDto } from './create-pong-server.dto';

export class UpdatePongServerDto extends PartialType(CreatePongServerDto) {
  id: number;
}
