import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { PongServerService } from './pong-server.service';
import { CreatePongServerDto } from './dto/create-pong-server.dto';
import { UpdatePongServerDto } from './dto/update-pong-server.dto';
import { Logger } from '@nestjs/common';


/** @WebSocketGateway The decorator can pass in some configuration options, such as the following example:
 *   @WebSocketGateway(80, {
 *     namespace: 'events',
 *     transports: ['websocket']
 *     cors: {
 *        origin: '*'
 *     },
 *     ...
 *   })
 **/

@WebSocketGateway({ cors: true})
export class PongServerGateway {
  constructor(private readonly pongServerService: PongServerService) {}

  @SubscribeMessage('createPongServer')
  create(@MessageBody() createPongServerDto: CreatePongServerDto) {
    return this.pongServerService.create(createPongServerDto);
  }

  @SubscribeMessage('findAllPongServer')
  findAll() {
    return this.pongServerService.findAll();
  }

  @SubscribeMessage('findOnePongServer')
  findOne(@MessageBody() id: number) {
    return this.pongServerService.findOne(id);
  }

  @SubscribeMessage('updatePongServer')
  update(@MessageBody() updatePongServerDto: UpdatePongServerDto) {
    return this.pongServerService.update(updatePongServerDto.id, updatePongServerDto);
  }

  @SubscribeMessage('removePongServer')
  remove(@MessageBody() id: number) {
    return this.pongServerService.remove(id);
  }

	@SubscribeMessage('socketTest')
	socketTest(@MessageBody() data: any) {
		Logger.log(data) // {test: 'test data'}
		return {
			msg1: 'Test 1',
			msg2: 'Test 2',
		}
	}

}
