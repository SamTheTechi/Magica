import { Base } from "./base/base";
import { ctx } from "../store/canvas";
import { PushGameObjectArray } from "../store/gameObject";
import { WeatherMetaData } from "../meta/weather";

export class Weather extends Base {
  constructor(MetaData, positionX, positionY) {
    super(positionX, positionY);
    this.type = 'weather';
    this.dead = false;
    this.positionX = positionX;
    this.positionY = positionY;
    this.img = MetaData.Image;
    this.AnimationDuration = MetaData.animationSpeed;
    this.width = MetaData.width;
    this.name = MetaData.name;
    this.height = MetaData.height;
    this.AnimationFrame = MetaData.frame - 1;
    this.frequency = MetaData.frequency;
    this.scalingFactor = MetaData.scalingFactor;
    this.velocity = MetaData.velocity;
    this.fallDistance = MetaData.distance;
  }

  draw(camera) {
    ctx.drawImage(
      this.img,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.positionX - camera.X,
      this.positionY - camera.Y,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor
    );
    this.movement();
  }

  movement() {
    if (this.gameframe % this.AnimationDuration === 0) {
      if (this.frame < this.AnimationFrame) this.frame++;
      else this.frame = 0;
    }
    if (this.fallDistance < 0) {
      if (this.name === 'rain')
        PushGameObjectArray(new Weather(WeatherMetaData['rainOnFloor'], this.positionX, this.positionY))
      this.dead = true;
    }
    this.gameframe++;
    if (this.name === 'rain') {
      this.positionX -= this.velocity / 2
    }
    this.positionY += this.velocity;
    this.fallDistance--;
  }

}
