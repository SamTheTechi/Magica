import { Living } from "./base/living";
import { MagnificationFactor } from "../constants/magnification";
import { ctx } from "../store/canvas";

export class Animals extends Living {
  constructor(MetaData, positionX, positionY, index) {
    super(positionX, positionY);
    this.type = 'animals';
    this.index = index;
    this.movementSpeed = MetaData.speed;
    this.image = MetaData.Image
    this.height = MetaData.height;
    this.width = MetaData.width;
    this.maxDistance = MetaData.range;
    this.animalsize = MetaData.size;
    this.moving = true;
    this.direction = true;
    this.startX = positionX;
    this.idle = false;
    this.idleFrameCount = 0;
  }

  draw(camera) {
    if (this.idle) {
      if (this.animalsize)
        this.frame = this.idleFrameCount % 110 < 10 ? 0 : 3;
      else
        this.frame = this.idleFrameCount % 110 < 10 ? 1 : 2;
      this.idleFrameCount++;
    } else {
      if (this.moving && this.gameframe % Math.floor(12 / this.movementSpeed) === 0) {
        if (this.direction) {
          this.frame = this.frame < 1 ? this.frame + 1 : 0;
        } else {
          this.frame = this.frame < 3 ? this.frame + 1 : 2;
        }
      }
      this.gameframe++;
    }

    ctx.drawImage(
      this.image,
      this.frame * this.width,
      0,
      this.width,
      this.height,
      this.positionX - camera.X,
      this.positionY - camera.Y,
      this.width * MagnificationFactor,
      this.height * MagnificationFactor,
    );

    this.movement();
  }

  movement() {
    if (this.idle) return;

    if (this.moving) {
      if (this.direction) {
        this.positionX -= this.movementSpeed;
        if (this.positionX <= this.startX - this.maxDistance) {
          this.direction = false;
        }
      } else {
        this.positionX += this.movementSpeed;
        if (this.positionX >= this.startX + this.maxDistance) {
          this.direction = true;
        }
      }

      if (Math.random() < 0.01) {
        this.idle = true;
        setTimeout(() => {
          this.idle = false;
        }, Math.random() * 4000 + 1000);
      }
    }
  }
}
