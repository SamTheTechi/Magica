import { Living } from "./base/living";
import { ctx } from "../store/canvas";

export class NPC extends Living {
  constructor(MetaData, positionX, positionY, index) {
    super(positionX, positionY);
    this.type = 'npc';
    this.index = index;
    this.movementSpeed = MetaData.speed;
    this.image = Object.assign(new Image(), { src: `${MetaData.Image}` });
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
    if (this.idle) {
      if (this.idleFrameCount % 50 === 0) {
        this.direction = Math.floor(Math.random() * 4);
      }
      this.idleFrameCount++;
    } else {
      if (this.moving && this.gameframe % Math.floor(12 / this.movementSpeed) === 0) {
        this.frame = this.frame < 3 ? this.frame + 1 : 2;
      }
      this.gameframe++;
    }

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

    this.movement();
  }

  movement() {
    if (this.idle) return;

    if (this.moving) {
      if (this.state) {
        this.positionX -= this.movementSpeed;
        if (this.positionX <= this.startX - this.maxDistance) {
          this.state = false;
        }
      } else {
        this.positionX += this.movementSpeed;
        if (this.positionX >= this.startX + this.maxDistance) {
          this.state = true;
        }
      }

      if (Math.random() < 0.01) {
        this.idle = true;
        setTimeout(() => {
          this.idle = false;
        }, Math.random() * 2000 + 1500);
      }
    }
  }
}
import { Base } from "./base/base";
import { MagnificationFactor } from "../constants/magnification";
import { ctx } from "../store/canvas";
import { Direction } from "../constants/direction";

export class Weapon extends Base {
  constructor(MetaData, Parent) {
    super(0, 0);
    this.image = MetaData.Image;
    this.swinging = false;
    this.swingOffsetX = 0;
    this.swingOffsetY = 0;
    this.swingDirection = -1;
    this.swingSpeed = 5;
    this.name = MetaData.name;
    this.parent = Parent;
    this.damage = MetaData.damage;
    this.type = MetaData.type;
    this.size = 16 * MagnificationFactor;
    this.width = MetaData.width;
    this.height = MetaData.height;
    this.maxSwingDistance = MetaData.height * 3.8;
  }

  draw(positionX, positionY, direction) {
    if (this.swinging) {

      let centerY = positionY + this.swingOffsetY;
      let centerX = positionX + this.swingOffsetX;
      let buffer = this.size / 2;

      this.positionX = centerX;
      this.positionY = centerY;
      if (this.parent === 'player') {
        centerX = this.canvasWidth / 2;
        centerY = this.canvasHeight / 2;
      }

      ctx.save()
      switch (direction) {
        case Direction.down:
          ctx.translate(centerX + this.swingOffsetX / 1.3 - 10 + buffer, centerY + this.swingOffsetY / 1.3 + buffer + 25);
          ctx.rotate((180 * Math.PI) / 180);
          this.swingOffsetY += this.swingSpeed * this.swingDirection;
          break;
        case Direction.up:
          ctx.translate(centerX + this.swingOffsetX / 1.3 - 10 + buffer, centerY + this.swingOffsetY / 1.3 - 25 + buffer);
          ctx.rotate((0 * Math.PI) / 180);
          this.swingOffsetY -= this.swingSpeed * this.swingDirection;
          break;
        case Direction.left:
          ctx.translate(centerX + this.swingOffsetX / 1.3 - 25 + buffer, centerY + this.swingOffsetY / 1.3 + 15 + buffer);
          ctx.rotate((270 * Math.PI) / 180);
          this.swingOffsetX -= this.swingSpeed * this.swingDirection;
          break;
        case Direction.right:
          ctx.translate(centerX + this.swingOffsetX / 1.3 + 25 + buffer, centerY + this.swingOffsetY / 1.3 + 15 + buffer);
          ctx.rotate((90 * Math.PI) / 180);
          this.swingOffsetX += this.swingSpeed * this.swingDirection;
          break;
      }

      ctx.drawImage(
        this.image,
        -this.width * 1.75,
        -this.height * 1.75,
        this.width * 3.5,
        this.height * 3.5
      );
      ctx.restore()

      ctx.fillStyle = 'blue';
      ctx.fillRect(
        this.canvasWidth / 2 + this.swingOffsetX,
        this.canvasHeight / 2 + this.swingOffsetY,
        this.size, this.size);

      this.swingSpeed = this.swingDirection === 1 ? 10 : 5;
      if (
        Math.abs(this.swingOffsetY) >= this.maxSwingDistance ||
        Math.abs(this.swingOffsetX) >= this.maxSwingDistance
      ) {
        this.swingDirection = -1;
      }
      if (this.swingDirection === -1 && this.swingOffsetY === 0 && this.swingOffsetX === 0) {
        this.positionX = 0;
        this.positionY = 0;
        this.swingOffsetY = 0;
        this.swingOffsetX = 0;
        this.swingDirection = 1;
        this.swinging = false;
      }
    }
  }

  attack() {
    if (!this.swinging) {
      this.swingDirection = 1;
      this.swinging = true;
    }
  }

  collisionBoundries() {
    return {
      top: this.positionY + 10,
      left: this.positionX - (this.size) / 2 + 10,
      bottom: this.positionY + (this.size) - 10,
      right: this.positionX + (this.size) / 2 - 10,
    };
  }
}

