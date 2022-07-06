import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
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


	//Game Logic :

	speed = 0;
	speed2 = 0;
	speedU = -10;
	speedD = 10;
	interv: any;
	padLen: number = 60;
	padHei: number = 15;

	ballR = 10;
	ballYS = 5;
	ballXS = -5; 
	score = 0;
	score2 = 0;
	canW = 650;
	canH = 480;
	ballX = this.canW / 2;
	ballY = this.canH / 2;
	ballSpeed = 5;

	startDirection() {
		let tmp = Math.random() * 1;
		console.log(tmp);
		if (tmp > 0.5)
			this.ballXS = -this.ballSpeed;
		else
			this.ballXS = this.ballSpeed;
		let tmp2 = Math.random() * 5 + 1;
			this.ballYS = tmp2;
		this.ballX = this.canW / 2;
		this.ballY = this.canH / 2;
	}

	x = 0;
	y = Math.floor(this.canH / 8);

	x2 = this.canW - this.padHei;
	y2 = Math.floor(this.canH / 8);

	up(client: Socket, players: string[]): void {
		if (client.id == players[0])
			this.speed = this.speedU;
		else if (client.id == players[1])
			this.speed2 = this.speedU;
	}

	down(client: Socket, players: string[]): void {
		if (client.id == players[0])
			this.speed = this.speedD;
		else if (client.id == players[1])
			this.speed2 = this.speedD;
	}

	stop(client: Socket, players: string[]): void {
		if (client.id == players[0])
			this.speed = 0;
		else if (client.id == players[1])
			this.speed2 = 0;
	}

	inBound(canH: number, player: number): boolean {
		if (player == 0){
			if ((this.y + this.speed < 0) || (this.y + this.padLen + this.speed >  canH))
				return false;
		}
		if (player == 1){
			if ((this.y2 + this.speed2 < 0) || (this.y2 + this.padLen + this.speed2 >  canH))
				return false;
		}
		return true;
	}

	leftCheck() {
		if (this.ballX < this.padHei + this.x) {
			if (this.ballY >= this.y && this.ballY <= this.y + this.padLen) {
				this.ballXS = -this.ballXS;
			}
		}
	}

	rightCheck() {
		if (this.ballX + this.ballR > this.x2) {
			if (this.ballY >= this.y2 && this.ballY <= this.y2 + this.padLen) {
				this.ballXS = -this.ballXS;
			}
		}
	}

	launchBall() {
		this.startDirection();
	}

	logic(canW:number, canH: number, player: string[], client: string): void {
		if (this.inBound(canH, 0) && player[0] == client)
			this.y += this.speed;
		else if (this.inBound(canH, 1) && player[1] == client)
			this.y2 += this.speed2;

		if (this.ballY < this.ballR || this.ballY > canH - this.ballR) {
			this.ballYS = - this.ballYS;
		}

		if (this.ballX < this.ballR)
		{
			this.score2 += 1;
			this.launchBall();
		}
		else if (this.ballX > this.canW - this.ballR)
		{
			this.score += 1;
			this.launchBall();
		}

		this.ballY += this.ballYS;
		this.ballX += this.ballXS;

		if (this.ballX < canW / 2)
			this.leftCheck();
		else
			this.rightCheck();

	}

}
