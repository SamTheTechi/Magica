import { Base } from "./base/base";
import { ctx } from "../store/canvas";

export class Items extends Base {
  constructor(MetaData, positionX, positionY, index) {
    super(positionX, positionY)
    this.type = 'item';
    this.dead = false;
    this.pickedUp = false;
    this.image = MetaData.Image;
    this.height = MetaData.height;
    this.width = MetaData.width;
    this.name = MetaData.name;
    this.kind = MetaData.kind;
    this.AnimationFrame = MetaData.frame - 1;
    this.AnimationDuration = MetaData.animationSpeed;
    this.scalingFactor = MetaData.scalingFactor
    this.audio = MetaData.audio;
    this.index = index;
    this.gameframe = index * 10;
    this.score = MetaData.score || 0;
    this.direction = false;
  }

  draw(camera) {
    ctx.drawImage(
      this.image,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.positionX - camera.X,
      this.positionY - camera.Y,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor
    );
    if (this.gameframe % this.AnimationDuration === 0) {
      if (this.frame < this.AnimationFrame) this.frame++;
      else this.frame = 0;
    }
    this.gameframe++
    this.animation()
  }

  animation() {
    if (this.gameframe % 30 === 0) {
      this.direction = !this.direction;
    }
    if (this.direction) this.positionY += .5;
    else this.positionY -= .5;
  }
}


