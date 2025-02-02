import { ctx } from "../store/canvas";
import { Base } from "./base/base";

export class Animation extends Base {
  constructor(MetaData, positionX, positionY, condition = false) {
    super(positionX, positionY);
    this.type = 'animation';
    this.dead = false;
    this.condition = condition;
    this.positionX = positionX;
    this.positionY = positionY;
    this.img = MetaData.Image;
    this.AnimationDuration = MetaData.animationSpeed;
    this.width = MetaData.width;
    this.name = MetaData.name;
    this.height = MetaData.height;
    this.AnimationFrame = MetaData.frame - 1;
    this.scalingFactor = MetaData.scalingFactor;
  }

  draw(camera) {
    ctx.drawImage(
      this.img,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.positionX - camera.X,
      this.positionY - camera.Y,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor,
    );
    this.movement()
  }

  movement() {
    if (this.gameframe % this.AnimationDuration === 0) {
      if (this.frame < this.AnimationFrame) this.frame++;
      else this.condition ? this.dead = true : this.frame = 0;
    }
    this.gameframe++;
  }

}
