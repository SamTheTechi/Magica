import { Living } from "./base/living";
import { ctx } from "../store/canvas";
import { MagnificationFactor } from "../constants/magnification";
import { Direction } from "../constants/direction";
import { eventEmmiter, EventMaping } from "../util/eventBinding";
import { Music } from "../declare";

export class Enemy extends Living {
  constructor(MetaData, positionX, positionY, index) {
    super(positionX, positionY);
    this.type = 'enemy';
    this.moving = false;
    this.resistance = 0;
    this.name = MetaData.name;
    this.movementSpeed = MetaData.Speed;
    this.proximity = MetaData.Range;
    this.damage = MetaData.Attack;
    this.hp = MetaData.Hp;
    this.ani = MetaData.ani;
    this.maxHp = MetaData.Hp;
    this.image = MetaData.Image;
    this.score = MetaData.Score;
    this.width = 16;
    this.height = 16;
    this.showBar = false;
    this.hideBarTimeout = null;
    this.index = index;
    this.count = 10;
    this.prev = this.direction;
    this.idleCounter = 0;
    this.hpBarProgress = Object.assign(new Image(), { src: `./HUD/LifeBarMiniProgress.png` })
    this.hpBarUnder = Object.assign(new Image(), { src: `./HUD/LifeBarMiniUnder.png` })
  }

  draw(Camera) {
    let playerX = Camera.X + this.canvasWidth / 2;
    let playerY = Camera.Y + this.canvasHeight / 2;
    this.movement(playerX, playerY)

    ctx.drawImage(
      this.image,
      this.direction * 16,
      this.frame * 16,
      this.width,
      this.height,
      this.positionX - Camera.X,
      this.positionY - Camera.Y,
      this.width * MagnificationFactor,
      this.height * MagnificationFactor
    );

    if (this.showBar) {
      ctx.drawImage(
        this.hpBarUnder,
        0,
        0,
        18,
        18,
        this.positionX - Camera.X,
        this.positionY - Camera.Y - 7,
        this.width * 4,
        this.height * 3
      );
      const hpPercentage = Math.max(this.hp / this.maxHp, 0);
      const hpBarWidth = (this.width * 4) * hpPercentage;
      ctx.drawImage(
        this.hpBarProgress,
        0,
        0,
        18 * hpPercentage,
        18,
        this.positionX - Camera.X,
        this.positionY - Camera.Y - 7,
        hpBarWidth,
        this.height * 3
      );
    }

    if (this.moving && this.gameframe % 6 === 0) {
      if (this.frame < 3) this.frame++;
      else this.frame = 0;
    }
    this.idleCounter++;
    this.gameframe++;
  }

  movement(playerX, playerY) {
    if (
      this.positionX + this.proximity > playerX &&
      this.positionX - this.proximity < playerX &&
      this.positionY + this.proximity > playerY &&
      this.positionY - this.proximity < playerY
    ) {
      if (this.resistance % 1.25 === 0) {

        this.showBar = true;
        this.moving = true;
        this.idleCounter = 0;

        if (this.hideBarTimeout) {
          clearTimeout(this.hideBarTimeout);
          this.hideBarTimeout = null;
        }

        switch (this.getDirection(playerX, playerY)) {
          case Direction.down:
            this.direction = Direction.down;
            this.positionY += this.movementSpeed;
            break;
          case Direction.up:
            this.direction = Direction.up;
            this.positionY -= this.movementSpeed;
            break;
          case Direction.left:
            this.direction = Direction.left;
            this.positionX -= this.movementSpeed;
            break;
          case Direction.right:
            this.direction = Direction.right;
            this.positionX += this.movementSpeed;
            break;
        }
      }
    } else {
      if ((this.idleCounter + this.count) % 100 === 0) {
        this.direction = Math.floor(Math.random() * 4);
        this.prev = this.direction;
        this.frame = 0;
        this.count = Math.floor(Math.random() * 20);
      }
      this.moving = false;
      if (!this.hideBarTimeout) {
        this.hideBarTimeout = setTimeout(() => {
          this.hideBarTimeout = null;
          this.showBar = false;
        }, 3000)
      }
    }
    if (this.resistance) {
      this.resistance -= 1;
    }
  }



  getDirection(playerX, playerY) {
    const distances = {
      up: playerY - this.positionY,
      down: this.positionY - playerY,
      left: this.positionX - playerX,
      right: playerX - this.positionX,
    };

    const max = Math.max(distances.up, distances.down, distances.left, distances.right);
    const buffer = 5;

    const weight = 0.7;
    if (this.direction === Direction.down && distances.up + buffer >= max * weight) return Direction.down;
    if (this.direction === Direction.up && distances.down + buffer >= max * weight) return Direction.up;
    if (this.direction === Direction.left && distances.left + buffer >= max * weight) return Direction.left;
    if (this.direction === Direction.right && distances.right + buffer >= max * weight) return Direction.right;

    if (distances.up === max) return Direction.down;
    if (distances.down === max) return Direction.up;
    if (distances.left === max) return Direction.left;
    if (distances.right === max) return Direction.right;
  }

  damageTaken(dmg, ani, x, y) {
    if (this.resistance === 0) {
      this.resistance = 35;
      this.hp -= dmg;
      this.showBar = true;
      if (!this.hideBarTimeout) {
        this.hideBarTimeout = setTimeout(() => {
          this.hideBarTimeout = null;
          this.showBar = false;
        }, 1000)
      }
      if (this.hp <= 0) {
        eventEmmiter.emit(EventMaping.ENEMY_DEAD, [this.index, this.score]);
        eventEmmiter.emit(EventMaping.ANIMATION, ['spirit', x, y]);
        this.dead = true;
        Music.playAudio('kill')
        return 0;
      }
      Music.playAudio('hit')
      eventEmmiter.emit(EventMaping.ANIMATION, [ani, x, y]);
    }
  }
}
