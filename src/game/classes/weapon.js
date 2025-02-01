import { Base } from "./base/base";
import { MagnificationFactor } from "../constants/magnification";
import { ctx } from "../store/canvas";
import { eventEmmiter } from "../util/eventBinding";
import { EventMaping } from "../util/eventBinding";
import { Direction } from "../constants/direction";

export class Weapon extends Base {
  constructor(MetaData, Parent) {
    super(0, 0);
    this.image = MetaData.Image;
    this.swinging = false;
    this.swingOffsetX = 0;
    this.swingOffsetY = 0;
    this.name = MetaData.name;
    this.parent = Parent;
    this.damage = MetaData.damage;
    this.audio = MetaData.audio;
    this.speed = 5;
    this.ani = MetaData.ani;
    this.swingDirection = 1;
    this.type = MetaData.type;
    this.size = 16 * MagnificationFactor;
    this.width = MetaData.width;
    this.height = MetaData.height;
    this.isPausing = false;
    this.prevDirection = 0;
    this.maxSwingDistance = MetaData.height * 3.25;
    this.canfire = true;
    if (this.type === 'range') this.Projectile = MetaData.Projectile;
  }

  draw(positionX, positionY, direction) {
    if (this.swinging) {
      let centerY = positionY + this.swingOffsetY;
      let centerX = positionX + this.swingOffsetX;
      let bufferY = this.size / 2;
      let bufferX = this.size / 2;

      this.positionX = centerX;
      this.positionY = centerY;
      if (this.parent === 'player') {
        centerX = this.canvasWidth / 2;
        centerY = this.canvasHeight / 2;
      }
      if (this.type === 'melee') {
        if (this.prevDirection !== direction) {
          switch (this.prevDirection) {
            case Direction.up:
              switch (direction) {
                case Direction.down:
                  this.swingOffsetY = -this.swingOffsetY;
                  break;
                case Direction.right:
                  this.swingOffsetX = -this.swingOffsetY;
                  this.swingOffsetY = 0;
                  break;
                case Direction.left:
                  this.swingOffsetX = this.swingOffsetY;
                  this.swingOffsetY = 0;
                  break;
              }
              break;

            case Direction.down:
              switch (direction) {
                case Direction.up:
                  this.swingOffsetY = -this.swingOffsetY;
                  break;
                case Direction.right:
                  this.swingOffsetX = this.swingOffsetY;
                  this.swingOffsetY = 0;
                  break;
                case Direction.left:
                  this.swingOffsetX = -this.swingOffsetY;
                  this.swingOffsetY = 0;
                  break;
              }
              break;

            case Direction.left:
              switch (direction) {
                case Direction.right:
                  this.swingOffsetX = -this.swingOffsetX;
                  break;
                case Direction.up:
                  this.swingOffsetY = this.swingOffsetX;
                  this.swingOffsetX = 0;
                  break;
                case Direction.down:
                  this.swingOffsetY = -this.swingOffsetX;
                  this.swingOffsetX = 0;
                  break;
              }
              break;

            case Direction.right:
              switch (direction) {
                case Direction.left:
                  this.swingOffsetX = -this.swingOffsetX;
                  break;
                case Direction.up:
                  this.swingOffsetY = -this.swingOffsetX;
                  this.swingOffsetX = 0;
                  break;
                case Direction.down:
                  this.swingOffsetY = this.swingOffsetX;
                  this.swingOffsetX = 0;
                  break;
              }
              break;
          }
        }

        this.speed = this.swingDirection === 1 ? 15 : 5;

        ctx.save()
        switch (direction) {
          case Direction.down:
            bufferY -= 35;
            this.swingOffsetY += this.speed * this.swingDirection;
            ctx.translate(centerX + this.swingOffsetX / 1 - 10 + bufferX, centerY + this.swingOffsetY / 1 + 25 + bufferY)
            ctx.rotate((180 * Math.PI) / 180);
            this.restartPosition(0, 30)
            break;
          case Direction.up:
            bufferY += 35;
            this.swingOffsetY -= this.speed * this.swingDirection;
            ctx.translate(centerX + this.swingOffsetX / 1 - 10 + bufferX, centerY + this.swingOffsetY / 1 - 25 + bufferY)
            ctx.rotate((0 * Math.PI) / 180);
            this.restartPosition(0, -30);
            break;
          case Direction.left:
            bufferX += 35;
            this.swingOffsetX -= this.speed * this.swingDirection;
            ctx.translate(centerX + this.swingOffsetX / 1 - 25 + bufferX, centerY + this.swingOffsetY / 1 + 15 + bufferY)
            ctx.rotate((270 * Math.PI) / 180);
            this.restartPosition(-30, 0)
            break;
          case Direction.right:
            bufferX -= 35;
            this.swingOffsetX += this.speed * this.swingDirection;
            ctx.translate(centerX + this.swingOffsetX / 1 + 25 + bufferX, centerY + this.swingOffsetY / 1 + 15 + bufferY)
            ctx.rotate((90 * Math.PI) / 180);
            this.restartPosition(30, 0)
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

        if (
          Math.abs(this.swingOffsetY) >= this.maxSwingDistance ||
          Math.abs(this.swingOffsetX) >= this.maxSwingDistance
        ) {
          if (!this.isPausing) {
            this.isPausing = true;
            this.swingDirection = 0;
            this.canfire = false;
            setTimeout(() => {
              this.isPausing = false;
              this.swingDirection = -1;
            }, 100);

            setTimeout(() => {
              this.canfire = true;
            }, 400)

          }
        }
        this.prevDirection = direction;
      }
      else if (this.type === 'range') {

        ctx.save()
        switch (direction) {
          case Direction.down:
            bufferX -= 10;
            bufferY += 40;
            ctx.translate(centerX + bufferX, centerY + bufferY)
            ctx.rotate((180 * Math.PI) / 180);
            break;
          case Direction.up:
            bufferX -= 10;
            bufferY -= 35;
            ctx.translate(centerX + bufferX, centerY + bufferY)
            ctx.rotate((0 * Math.PI) / 180);
            break;
          case Direction.left:
            bufferX -= 35;
            bufferY += 15;
            ctx.translate(centerX + bufferX, centerY + bufferY)
            ctx.rotate((270 * Math.PI) / 180);
            break;
          case Direction.right:
            bufferX += 35;
            bufferY += 15;
            ctx.translate(centerX + bufferX, centerY + bufferY)
            ctx.rotate((90 * Math.PI) / 180);
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

        if (!this.isPausing) {
          this.isPausing = true;
          this.swingDirection = 0;
          this.canfire = false;
          eventEmmiter.emit(EventMaping.PROJECTILE_FIRE, [this.positionX, this.positionY, direction, this.parent, this.Projectile]);
          setTimeout(() => {
            this.isPausing = false;
            this.swingDirection = -1;
            this.swinging = false;
          }, 350);

          setTimeout(() => {
            this.canfire = true;
          }, 650)
        }

      }
    }
  }

  restartPosition(x, y) {
    if (this.type === `melee`) {

      if (this.swingDirection === -1 && this.swingOffsetY === y && this.swingOffsetX === x) {
        this.positionX = 0;
        this.positionY = 0;
        this.swingOffsetY = 0;
        this.swingOffsetX = 0;
        this.swingDirection = 1;
        this.swinging = false;
      }
    } else {
      this.swingOffsetY = 0;
      this.swingOffsetX = 0;
      this.swingDirection = 1;
      this.swinging = false;
    }
  }
  attack() {
    if (!this.swinging && this.canfire) {
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

