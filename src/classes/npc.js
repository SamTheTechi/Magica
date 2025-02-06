import { Living } from "./base/living";
import { ctx } from "../store/canvas";
import { Direction } from "../constants/direction";
import { Music } from "../declare";

export class NPC extends Living {
  constructor(MetaData, positionX, positionY, index) {
    super(positionX, positionY);
    this.type = 'npc';
    this.index = index;
    this.movementSpeed = MetaData.speed;
    this.image = MetaData.Image;
    this.shadowImage = Object.assign(new Image(), { src: `./Actor/Characters/Shadow.png` });
    this.dialogImage = Object.assign(new Image(), { src: `./HUD/DialogInfo.png` });
    this.height = MetaData.height;
    this.width = MetaData.width;
    this.scalingFactor = MetaData.scalingFactor;
    this.maxDistance = MetaData.range;
    this.proximity = 90;
    this.startX = positionX;
    this.startY = positionY;
    this.ifClose = false;
    this.direction = Direction.down;
    this.moving = true;
    this.idle = false;
    this.prev = this.direction;
    this.idleFrameCount = 0;
    this.counter = 0;
  }

  draw(camera) {
    let playerX = camera.X + this.canvasWidth / 2;
    let playerY = camera.Y + this.canvasHeight / 2;

    if (this.idle) {
      this.frame = 0;
      if (this.idleFrameCount === 0) {
        this.direction = Math.floor(Math.random() * 4);
      }
      this.idleFrameCount++;
    } else {
      this.idleFrameCount = 0;
      if (this.moving && this.gameframe % Math.floor(12 / this.movementSpeed) === 0) {
        if (this.frame < 3) this.frame++;
        else this.frame = 0;
      }
    }
    if (this.gameframe % 10 === 0) this.counter++;
    this.gameframe++;

    this.movement(playerX, playerY);

    ctx.drawImage(
      this.shadowImage,
      0,
      0,
      this.width,
      this.height,
      this.positionX + this.width / 2 - camera.X,
      this.positionY + this.height * 2.7 - camera.Y + 2,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor
    );

    if (this.ifClose) {
      if (this.gameframe % 15 === 0) {
        Music.playAudio('npc')
      }
      ctx.drawImage(
        this.dialogImage,
        (this.counter % 4) * 20,
        0,
        20,
        16,
        this.positionX - camera.X,
        this.positionY - camera.Y - (this.height * 1.8),
        14 * this.scalingFactor,
        9 * this.scalingFactor,
      );
    }
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

  movement(playerX, playerY) {
    if (
      this.positionX + this.proximity > playerX &&
      this.positionX - this.proximity < playerX &&
      this.positionY + this.proximity > playerY &&
      this.positionY - this.proximity < playerY
    ) {
      this.ifClose = true;
    } else {
      this.ifClose = false;
    }

    if (this.idle) return;

    if (this.moving) {
      switch (this.direction) {
        case Direction.up:
          this.positionY -= this.movementSpeed;
          if (this.positionY <= this.startY - this.maxDistance) {
            this.direction = Direction.down;
          }
          break;
        case Direction.down:
          this.positionY += this.movementSpeed;
          if (this.positionY >= this.startY + this.maxDistance) {
            this.direction = Direction.up;
          }
          break;
        case Direction.left:
          this.positionX -= this.movementSpeed;
          if (this.positionX <= this.startX - this.maxDistance) {
            this.direction = Direction.right;
          }
          break;
        case Direction.right:
          this.positionX += this.movementSpeed;
          if (this.positionX >= this.startX + this.maxDistance) {
            this.direction = Direction.left;
          }
          break;
      }

      if (Math.random() < 0.01) {
        this.idle = true;
        setTimeout(() => {
          this.idle = false;
        }, Math.random() * 4000 + 1000);
      }
    }
  }

  collisionBoundries() {
    return {
      top: this.positionY + 20,
      left: this.positionX - (this.width * this.scalingFactor) / 2 + 10,
      bottom: this.positionY + (this.height * this.scalingFactor),
      right: this.positionX + (this.width * this.scalingFactor) / 2 - 10,
    };
  }
}
