import { Base } from './base';

export class Living extends Base {
  constructor(positionX, positionY) {
    super(positionX, positionY)
    this.dead = false;
    this.image = '';
    this.direction = 0;
    this.hp = 0;
    this.height = null;
    this.width = null;
    this.idleCounter = 0;
    this.idleDuration = 300;
  }

  idle() {
    if (this.movementState == this.movementBehaviour.idle) {
      switch (this.direction) {
        case Direction.down:
          this.direction = Direction.down;
          this.positionY += this.movementSpeed;
          break;
        case Direction.up:
          this.direction = Direction.up;
          this.positionY -= this.movementSpeed;
          break;
        case Direction.left:
          this.direction = Direction.left;
          this.positionX -= this.movementSpeed;
          break;
        case Direction.right:
          this.direction = Direction.right;
          this.positionX += this.movementSpeed;
          break;
      }

    }
  }
}
