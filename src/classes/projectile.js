import { Base } from "./base/base";
import { ctx } from "../store/canvas";
import { MagnificationFactor } from "../constants/magnification";
import { Direction } from "../constants/direction";

export class Projetile extends Base {
  constructor(positionX, positionY, direction, parent, MetaData) {
    super(positionX, positionY)
    this.positionX = positionX;
    this.dead = false;
    this.positionY = positionY;
    this.direction = direction;
    this.ani = MetaData.ani;
    this.damage = MetaData.damage;
    this.parent = parent;
    this.speed = MetaData.speed;
    this.width = MetaData.width;
    this.height = MetaData.height;
    this.duration = MetaData.duration;
    this.noFrame = MetaData.frames;
    this.image = MetaData.Image;
    this.decrementRate = MetaData.decrementRate;
    this.name = MetaData.name;
    this.widtha = MetaData.width
    this.type = 'projectile'
    switch (this.direction) {
      case Direction.up:
      case Direction.down:
        this.positionX += 5;
        break;
      case Direction.right:
      case Direction.left:
        this.positionY += 25;
        break;
    }
  }

  draw(camera) {

    switch (this.direction) {
      case Direction.up:
        this.positionY -= this.speed;
        if (this.name === 'shuriken') this.widtha = 0;
        else
          this.widtha = 0;
        break;
      case Direction.down:
        this.positionY += this.speed;
        if (this.name === 'shuriken') this.widtha = 0;
        else
          this.widtha = 1;
        break;
      case Direction.left:
        this.positionX -= this.speed;
        if (this.name === 'shuriken') this.widtha = 0;
        else
          this.widtha = 2;
        break;
      case Direction.right:
        this.positionX += this.speed;
        if (this.name === 'shuriken') this.widtha = 0;
        else
          this.widtha = 3;
        break;
    }

    if (this.speed > 7) this.speed -= this.decrementRate;
    else if (this.speed > 0) this.speed -= this.decrementRate * 2.5;
    else if (this.speed <= 0) this.dead = true

    ctx.drawImage(
      this.image,
      this.width * this.frame,
      this.widtha * this.width,
      this.width,
      this.height,
      this.positionX - camera.X,
      this.positionY - camera.Y,
      this.width * MagnificationFactor / 1.5,
      this.height * MagnificationFactor / 1.5
    )

    if (this.gameframe % 5 === 0) {
      if (this.frame < this.noFrame - 1) this.frame++;
      else this.frame = 0;
    }
    this.gameframe++;
  }
}
