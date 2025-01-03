import { canvasHeight, canvasWidth } from '../../store/canvas';
import { MagnificationFactor } from '../../constants/magnification';

export class Base {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.type = ''
    this.frame = 0;
    this.gameframe = 0;
  }

  collisionBoundries() {
    return {
      top: this.positionY,
      left: this.positionX - (this.width * MagnificationFactor) / 2,
      bottom: this.positionY + (this.height * MagnificationFactor),
      right: this.positionX + (this.width * MagnificationFactor) / 2,
    };
  }
}
