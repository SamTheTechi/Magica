import { Living } from "./base/living";
import { ctx } from "../store/canvas";

export class NPC extends Living {
  constructor(MetaData, positionX, positionY, index) {
    super(positionX, positionY);
    this.type = 'npc';
    this.index = index;
    this.movementSpeed = MetaData.speed;
    this.image = MetaData.Image;
    this.shadowImage = Object.assign(new Image(), { src: `./Actor/Characters/Shadow.png` });
    this.dialogImage = Object.assign(new Image(), { src: `./HUD/Dialog/DialogInfo.png` })
    this.height = MetaData.height;
    this.width = MetaData.width;
    this.scalingFactor = MetaData.scalingFactor;
    this.maxDistance = MetaData.range;
    this.moving = true;
    this.startX = positionX;
    this.idle = false;
    this.ifClose = false;
    this.idleFrameCount = 0;
  }

  draw(camera) {
    if (this.moving && this.gameframe % 8 === 0) {
      if (this.frame < 3) this.frame++;
      else this.frame = 0;
    }
    this.gameframe++;

    ctx.drawImage(
      this.shadowImage,
      0,
      0,
      this.width,
      this.height,
      this.positionX + this.width / 2 - camera.X,
      this.positionY + this.height * 2.7 - camera.Y,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor
    );

    ctx.drawImage(
      this.dialogImage,
      this.frame * 20,
      0,
      20,
      16,
      this.positionX - camera.X,
      this.positionY - camera.Y - (this.height * 1.8),
      14 * this.scalingFactor,
      9 * this.scalingFactor,
    );

    ctx.drawImage(
      this.image,
      this.direction * this.height,
      this.frame * this.width,
      this.width,
      this.height,
      this.positionX - camera.X,
      this.positionY - camera.Y,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor,
    );
  }
}
