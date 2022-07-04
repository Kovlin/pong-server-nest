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


	//Game Logic :

	speed = 0;
	speedU = -10;
	speedD = 10;
	interv: any;
	padLen: number = 60;
	padHei: number = 15;

	ballR = 10;
	ballX = 120;
	ballY = 120;
	ballYS = -5;
	ballXS = 5;
	score = 0;	

	x = 5;
	y = Math.floor(473 / 8);

	up(): void {
		this.speed = this.speedU;
	}

	down(): void {
		this.speed = this.speedD;
	}

	stop(): void {
		this.speed = 0;
	}

	inBound(canH: number): boolean {
		let check =  canH;
		if ((this.y + this.speed < 0) || (this.y + this.padLen + this.speed >  canH))
			return false;
		return true;
	}

	logic(canW:number, canH: number): void {
		if (this.inBound(canH))
			this.y += this.speed;

		if (this.ballY < this.ballR || this.ballY > canH - this.ballR) {
			this.ballYS = - this.ballYS;
		}

		if (this.ballX < this.ballR) {
			this.ballX = 120;
			this.ballY = 120;
			this.ballYS = -5;
			this.ballXS = 5;
			this.score = 0;
		}

		if (this.ballX > canW) {
			this.ballX -= this.ballXS;
			this.ballXS = -this.ballXS
		}

		this.ballY += this.ballYS;
		this.ballX += this.ballXS;

		if (this.ballX - this.ballR <= this.padHei + this.x && this.ballX > this.x) {
			if (this.ballY >= this.y && this.ballY <= this.y + this.padLen) {
				this.ballXS = -this.ballXS;
				this.score += 1;
			}
		}
	}

}
