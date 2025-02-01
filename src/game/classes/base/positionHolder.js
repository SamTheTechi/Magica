export class Position {
  constructor(name, positionX, positionY, direction = -1) {
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.direction = direction;
  }
}
