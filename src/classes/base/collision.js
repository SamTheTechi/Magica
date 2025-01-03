import { ctx } from "../../store/canvas";

export class Collision {
  constructor(positionX, positionY, size, type, location) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = size;
    this.height = size;
    this.type = type;
    this.location = location;
    this.buffer = 2;
  }

  draw(camera) {
    if (this.type === 'collision') {
      //     ctx.fillStyle = `rgba(255,0,0,0.1)`;
    } else {
      //    ctx.fillStyle = `rgba(0,255,255,0.1)`;
    }
    // ctx.fillRect(this.positionX - camera.X, this.positionY - camera.Y, 32, 32);
  }

  collisionBoundries() {
    if (this.type === 'collision') this.buffer = 16;
    return {
      top: this.positionY + this.buffer,
      left: this.positionX - this.width + this.buffer,
      bottom: this.positionY + this.height - this.buffer,
      right: this.positionX - this.buffer,
    };
  }
}
