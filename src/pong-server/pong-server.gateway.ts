import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { PongServerService } from './pong-server.service';
import { CreatePongServerDto } from './dto/create-pong-server.dto';
import { UpdatePongServerDto } from './dto/update-pong-server.dto';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true})
export class PongServerGateway {
  constructor(private readonly pongServerService: PongServerService) {}

	server: Server;
	connUser : string[] = [];

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

	@SubscribeMessage('speed')
	speed(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
		if (data[0] == 0)
			this.pongServerService.stop(client, this.connUser);
		else if (data[0] == 1)
			this.pongServerService.up(client, this.connUser);
		else if (data[0] == 2)
			this.pongServerService.down(client, this.connUser);
		// console.log(data[0]);
	}

	ready1: boolean = false;
	ready2: boolean = false;
	ready: boolean = false;
	@SubscribeMessage('go')
	go(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
		if (client.id == this.connUser[0])
			this.ready1 = data[0];
		if (client.id == this.connUser[1])
			this.ready2 = data[0];
		if (this.ready1 && this.ready2)
			this.ready = true;
		else
			this.ready = false;
		console.log(`ready: ${this.ready1} | ready1: ${this.ready1} | ready2: ${this.ready2}`);
	}

	player: number[];
	@SubscribeMessage('start')
	start(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
		if (this.ready)
		{		
			this.pongServerService.logic(data[0], data[1], this.connUser, client.id);
			return {
				ballX : this.pongServerService.ballX,
				ballY : this.pongServerService.ballY,
				x 		: this.pongServerService.x,
				y 		: this.pongServerService.y,
				x2 		: this.pongServerService.x2,
				y2 		: this.pongServerService.y2,
				score : this.pongServerService.score,
				score2 : this.pongServerService.score2,
				gameOk : 1,
			}
		}
		else
			return {gameOk: 0}
	}

	
	handleConnection(socket: Socket) {
		console.log(socket.id);
		this.connUser.push(socket.id);
		// console.log(socket);
	}
}
