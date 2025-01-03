import { canvasWidth, canvasHeight } from '../store/canvas'

export class View {
  constructor() {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.worldWidth = 2560;
    this.worldHeight = 1920;
    this.X = 0;
    this.Y = 0;
  }

  update(playerY, playerX) {
    this.X = playerX - this.canvasWidth / 2;
    this.Y = playerY - this.canvasHeight / 2;
  }
}
