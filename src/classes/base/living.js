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
  }

}
