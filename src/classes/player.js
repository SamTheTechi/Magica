import { Living } from "./base/living";
import { ctx } from "../store/canvas";
import { EventMaping, eventEmmiter } from "../util/eventBinding";
import { HeartMapping } from "../constants/healthMapping";
import { MagnificationFactor } from "../constants/magnification";
import { Direction } from "../constants/direction";
import { Music } from "../declare";

export class Player extends Living {
  constructor(image, positionX, positionY) {
    super(positionX, positionY);
    this.positionX = 1000;
    this.positionY = 800;
    this.resistance = 0;
    this.width = 16;
    this.height = 16;
    this.equipedWeapon = null;
    this.inventry = [];
    this.movementSpeed = 6;
    this.moving = false;
    this.hp = 12;
    this.potion = 1;
    this.movementRestriction = {
      up: true,
      down: true,
      left: true,
      right: true,
    };
    this.hpImage = Object.assign(new Image(), { src: `./HUD/Heart.png` })
    this.shadowImage = Object.assign(new Image(), { src: `./Actor/Characters/Shadow.png` });
    this.image = Object.assign(new Image(), { src: `${image}` });
    this.potionImage = Object.assign(new Image(), { src: `./Items/Potion/LifePot.png` })
    this.type = 'player'
  }

  addWeapon(weapon) {
    let val = this.inventry.findIndex((obj) => obj.type === weapon.type)
    if (val !== -1) {
      this.inventry.splice(val, 1, weapon);
      this.equipedWeapon = weapon;
    }
    else {
      this.inventry.push(weapon)
      this.equipedWeapon = weapon;
    }
  }

  switchWeapon() {
    if (this.inventry.length > 1 && (!this.equipedWeapon.swinging || this.equipedWeapon.swinging === undefined)) {
      let index = this.inventry.findIndex(weapon => weapon === this.equipedWeapon);
      index = (index + 1) % this.inventry.length;
      this.equipedWeapon = this.inventry[index];
      Music.playAudio('switch')
    }
  }

  attack() {
    if (this.equipedWeapon && this.equipedWeapon.canfire) {
      this.equipedWeapon.attack();
      Music.playAudio(this.equipedWeapon.audio)
    }
  }

  damageTaken(dmg, ani, x, y) {
    if (this.resistance === 0) {
      this.resistance = 45;
      eventEmmiter.emit(EventMaping.ANIMATION, [ani, x, y]);
      this.hp -= dmg;
      Music.playAudio('damage')
    } else if (this.hp <= 0) {
      this.dead = true;
    }
  }

  eatFood() {
    if (this.hp < 12) {
      if (this.hp === 11) this.hp += 1;
      else this.hp += 2;
      return true;
    }
    else
      return false
  }

  usePotion() {
    let count = 0;
    let time = setInterval(() => {
      if (this.hp >= 12 || count >= 4) {
        clearInterval(time);
        return;
      }
      this.hp++;
      count++;
    }, 200);
    Music.playAudio('potion')
    this.potion--;
  }

  canUsePotion() {
    return this.hp < 12 && this.potion > 0;
  }

  addPotion() {
    if (this.potion <= 3)
      this.potion++;
  }

  draw() {
    if (this.resistance) this.resistance -= 1;
    const drawX = this.canvasWidth / 2;
    const drawY = this.canvasHeight / 2;
    if (this.inventry.length > 0)
      this.equipedWeapon.draw(this.positionX, this.positionY, this.direction);

    ctx.drawImage(
      this.shadowImage,
      0,
      0,
      this.width,
      this.height,
      drawX + this.width / 2,
      drawY + this.height * 2.7,
      this.width * MagnificationFactor,
      this.height * MagnificationFactor
    );

    ctx.drawImage(
      this.image,
      this.direction * 16,
      this.frame * 16,
      this.width,
      this.height,
      drawX,
      drawY,
      this.width * MagnificationFactor,
      this.height * MagnificationFactor
    )
    this.drawPotion()
    this.drawHp()
    if (this.moving) {
      switch (this.direction) {
        case Direction.down:
          if (this.movementRestriction.down) {
            this.positionY += this.movementSpeed;
            this.movementRestriction.right = true;
            this.movementRestriction.left = true;
            this.movementRestriction.up = true;
          }
          break;
        case Direction.up:
          if (this.movementRestriction.up) {
            this.positionY -= this.movementSpeed;
            this.movementRestriction.right = true;
            this.movementRestriction.left = true;
            this.movementRestriction.down = true;
          }
          break;
        case Direction.left:
          if (this.movementRestriction.left) {
            this.positionX -= this.movementSpeed;
            this.movementRestriction.right = true;
            this.movementRestriction.down = true;
            this.movementRestriction.up = true;
          }
          break;
        case Direction.right:
          if (this.movementRestriction.right) {
            this.positionX += this.movementSpeed;
            this.movementRestriction.down = true;
            this.movementRestriction.left = true;
            this.movementRestriction.up = true;
          } break;
        default:
      }
      if (this.equipedWeapon !== null && this.equipedWeapon.swinging) {
        this.frame = 4;
      }
      else if (this.gameframe % 8 === 0) {
        if (this.frame < 3) this.frame++;
        else this.frame = 0;
      }
    }
    else if (this.equipedWeapon !== null && this.equipedWeapon.swinging) {
      this.frame = 4;
    }
    else {
      this.frame = 0;
    }
    this.gameframe++;
  }

  drawHp() {
    ctx.drawImage(
      this.hpImage,
      HeartMapping.First[this.hp] * 16,
      0,
      this.width,
      this.height,
      10,
      0,
      this.width * MagnificationFactor,
      this.height * MagnificationFactor
    )
    ctx.drawImage(
      this.hpImage,
      HeartMapping.Second[this.hp] * 16,
      0,
      this.width,
      this.height,
      12 + this.width * MagnificationFactor,
      0,
      this.width * MagnificationFactor,
      this.height * MagnificationFactor
    )
    ctx.drawImage(
      this.hpImage,
      HeartMapping.Third[this.hp] * 16,
      0,
      this.width,
      this.height,
      14 + this.width * 2 * MagnificationFactor,
      0,
      this.width * MagnificationFactor,
      this.height * MagnificationFactor
    )
  }

  drawPotion() {
    for (let i = 0; i < this.potion; i++) {
      ctx.drawImage(
        this.potionImage,
        0,
        0,
        this.width,
        this.height,
        20 + (this.width * i * MagnificationFactor),
        this.height * 5,
        this.width * MagnificationFactor,
        this.height * MagnificationFactor
      )
    }
  }

  updatePlayerLocaion(positionX, positionY, direction) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.direction = direction;
  }

  moveDown() {
    this.direction = Direction.down;
  }
  moveUp() {
    this.direction = Direction.up;
  }
  moveLeft() {
    this.direction = Direction.left;
  }
  moveRight() {
    this.direction = Direction.right;
  }

  restrictMovement(direction) {
    switch (direction) {
      case Direction.up:
        this.movementRestriction.up = false;
        break;
      case Direction.down:
        this.movementRestriction.down = false;
        break;
      case Direction.left:
        this.movementRestriction.left = false;
        break;
      case Direction.right:
        this.movementRestriction.right = false;
        break;
    }
  }
}
