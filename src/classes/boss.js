import { Living } from "./base/living";
import { ctx } from "../store/canvas";
import { MagnificationFactor } from "../constants/magnification";
import { PushGameObjectArray } from "../store/gameObject";
import { EnemyMetaData } from "../meta/enemy";
import { Enemy } from "./enemy";
import { Direction } from "../constants/direction";
import { eventEmmiter, EventMaping } from "../util/eventBinding";
import { Music } from "../declare";

export class Boss extends Living {
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
    this.width = 50;
    this.height = 50;
    this.showBar = false;
    this.hideBarTimeout = null;
    this.index = index;
    this.backup = true;
    this.hitAni = false;
    this.hpBarProgress = Object.assign(new Image(), { src: `./HUD/LifeBarMiniProgress.png` })
    this.hpBarUnder = Object.assign(new Image(), { src: `./HUD/LifeBarMiniUnder.png` })
  }

  draw(Camera) {
    let playerX = Camera.X + this.canvasWidth / 2 - this.height * MagnificationFactor / 2 + this.height / 2;
    let playerY = Camera.Y + this.canvasHeight / 2 - this.width * MagnificationFactor / 2 + this.width / 2;
    this.movement(playerX, playerY)

    ctx.drawImage(
      this.image,
      this.frame * 50,
      0,
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
        this.positionX - Camera.X + 15,
        this.positionY - Camera.Y + 5,
        this.width * 3,
        this.height * 1
      );
      const hpPercentage = Math.max(this.hp / this.maxHp, 0);
      const hpBarWidth = (this.width * 3) * hpPercentage;
      ctx.drawImage(
        this.hpBarProgress,
        0,
        0,
        18 * hpPercentage,
        18,
        this.positionX - Camera.X + 17,
        this.positionY - Camera.Y + 5,
        hpBarWidth,
        this.height * 1
      );
    }

    if (this.gameframe % 6 === 0) {
      if (this.hitAni) {
        if (this.frame < 7) {
          this.frame++
        }
        else {
          this.frame = 0;
          this.hitAni = false;
        }
      } else {
        this.frame = (this.frame < 3) ? this.frame + 1 : 0;
      }
    }
    this.gameframe++;

    if (this.hp <= 200 && this.backup) {
      PushGameObjectArray(new Enemy(EnemyMetaData['flame'], 780, 775, 0));
      PushGameObjectArray(new Enemy(EnemyMetaData['flame'], 1990, 650, 0));
      PushGameObjectArray(new Enemy(EnemyMetaData['flame'], 1300, 1350, 0));
      this.backup = false;
    }
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
        if (this.hideBarTimeout) {
          clearTimeout(this.hideBarTimeout);
          this.hideBarTimeout = null;
        }
        switch (this.getDirection(playerX, playerY)) {
          case Direction.down:
            this.positionY += this.movementSpeed;
            break;
          case Direction.up:
            this.positionY -= this.movementSpeed;
            break;
          case Direction.left:
            this.positionX -= this.movementSpeed;
            break;
          case Direction.right:
            this.positionX += this.movementSpeed;
            break;
        }
      }
    } else {
      this.moving = false;
      if (!this.hideBarTimeout) {
        this.hideBarTimeout = setTimeout(() => {
          this.hideBarTimeout = null;
          this.showBar = false;
        }, 1000)
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

  damageTaken(dmg) {
    if (this.resistance === 0) {
      this.resistance = 40;
      this.hp -= dmg;
      this.frame = 4;
      this.hitAni = true;
      if (this.hp <= 0) {
        eventEmmiter.emit(EventMaping.ENEMY_DEAD, [this.index, this.score]);
        eventEmmiter.emit(EventMaping.GAME_WON);
        this.dead = true;
        Music.playAudio('alert')
        return 0;
      }
      Music.playAudio('hit')
    }
  }
  collisionBoundries() {
    return {
      top: this.positionY,
      left: this.positionX - this.width,
      bottom: this.positionY + (this.height * MagnificationFactor),
      right: this.positionX + (this.width * MagnificationFactor) * 0.95,
    };
  }
}
