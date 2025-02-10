import { AnimalsSpawnList, AnimationSpawnList, EnemySpawnList, ItemSpawnList, NPCSpawnList } from "../adjecentLists";
import { ctx, canvasWidth, canvasHeight } from "../store/canvas";
import { letter, canClose, closeLetter, forceCloseLetter } from "../ui/letterMsg";
import { PushGameObjectArray, OverWrightGameObjectArray, ReadGameObjectArray } from "../store/gameObject";
import { LetterMetaData } from "../meta/letter";
import { ItemMetaData } from "../meta/item";
import { Projetile } from "./projectile";
import { Node } from "./base/node";
import { Items } from "./item";
import { Collision } from "./base/collision";
import { Enemy } from './enemy'
import { Boss } from "./boss";
import { Animals } from "./animal";
import { EnemyMetaData } from "../meta/enemy";
import { AnimalMetaData } from "../meta/animal"
import { WeatherMetaData } from "../meta/weather";
import { NpcMetaData } from "../meta/npc";
import { Weather } from "./weather";
import { ShowBanner } from "../ui/locationBanner";
import { UpdateScore } from "../ui/score";
import { NPC } from "./npc";
import { AnimationMetaData } from "../meta/animation";
import { Animation } from "./animation";
import { Music } from "../declare";

export class Game {
  constructor(MetaData) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.nodes = {};
    this.positionX = 0;
    this.positionY = 0;
    this.currentNode = null;
    this.fadeState = false;
    this.Score = 0;
    this.alpha = 1;
    this.value = false;
    this.loadMapMetaData(MetaData)
  }

  loadMapMetaData(metaData) {
    for (const i in metaData) {
      const { Name, DataArray, Image, neighbours, Weather, audio, overlay } = metaData[i];
      this.nodes[Name] = new Node(Name, DataArray, Weather, Image, neighbours, audio, overlay)
    }
    this.value = true;
    this.currentNode = this.nodes['home'];
    this.generateMap()
    this.generateAdjecentList();
  }

  Loading() {
    return this.value;
  }

  draw(Camera) {
    const drawX = this.positionX - Camera.X;
    const drawY = this.positionY - Camera.Y;
    ctx.drawImage(this.currentNode.image, drawX, drawY)
    this.generateWeather()
    UpdateScore(this.Score)
  }

  drawOverlay(Camera) {
    if (this.currentNode.overlay) {
      const drawX = this.positionX - Camera.X;
      const drawY = this.positionY - Camera.Y;
      ctx.drawImage(this.currentNode.overlay, drawX, drawY)
    }
  }

  generateMap() {
    Music.stopAllAudio();
    const filterObject = ReadGameObjectArray().filter(
      (obj) => { return obj.type === 'player' }
    );
    if (this.currentNode.audio !== undefined)
      Music.playAudio(this.currentNode.audio);
    OverWrightGameObjectArray(filterObject)
    this.currentNode.dataArray.forEach((Xaxis, i) => {
      Xaxis.forEach((Yaxis, j) => {
        const x = j * Node.PixilSize;
        const y = i * Node.PixilSize
        if (Yaxis === 1) {
          PushGameObjectArray(new Collision(x, y, Node.PixilSize, 'collision'));
        }
        else if (typeof Yaxis === 'string') {
          PushGameObjectArray(new Collision(x, y, Node.PixilSize, 'location', Yaxis));
        }
      })
    })
  }

  switchMap(player, name) {
    this.fade();
    const loc = this.currentNode.neighbour.filter((loc) => loc.name === name)[0];
    player.movementSpeed = 0;
    ShowBanner(name);
    forceCloseLetter();
    setTimeout(() => {
      player.updatePlayerLocaion(loc.positionX, loc.positionY, loc.direction)
      this.currentNode = this.nodes[name];
      this.generateMap();
      this.generateAdjecentList();
      player.movementSpeed = 5.5;
    }, 700)
  }

  generateWeather() {
    if (this.currentNode.weather === 'none' || this.currentNode.weather === undefined) return;
    const weather = this.currentNode.dataArray.map((Xaxis) => {
      return Xaxis.map(() => {
        if (Math.floor(Math.random() * (100000 / WeatherMetaData[this.currentNode.weather].frequency)) === 0) {
          return this.currentNode.weather;
        }
        return 0
      })
    })
    weather.forEach((Xaxis, i) => {
      Xaxis.forEach((Yaxis, j) => {
        const x = j * Node.PixilSize;
        const y = (i - 5) * Node.PixilSize;
        if (WeatherMetaData[Yaxis]) {
          PushGameObjectArray(new Weather(WeatherMetaData[Yaxis], x, y))
        }
      })
    })
  }

  generateAdjecentList() {
    if (AnimationSpawnList[this.currentNode.name] !== undefined)
      AnimationSpawnList[this.currentNode.name].forEach((item) => {
        PushGameObjectArray(new Animation(AnimationMetaData[item.name], item.positionX, item.positionY))
      });
    if (ItemSpawnList[this.currentNode.name] !== undefined)
      ItemSpawnList[this.currentNode.name].forEach((item, index) => {
        if (item.direction)
          PushGameObjectArray(new Items(ItemMetaData[item.name], item.positionX, item.positionY, index))
      });
    if (EnemySpawnList[this.currentNode.name] !== undefined)
      EnemySpawnList[this.currentNode.name].forEach((item, index) => {
        if (item.direction) {
          if (item.name !== 'boss')
            PushGameObjectArray(new Enemy(EnemyMetaData[item.name], item.positionX, item.positionY, index))
          else {
            PushGameObjectArray(new Boss(EnemyMetaData[item.name], item.positionX, item.positionY, index))
          }
        }
      })
    if (AnimalsSpawnList[this.currentNode.name] !== undefined)
      AnimalsSpawnList[this.currentNode.name].forEach((item, index) => {
        if (item.direction)
          PushGameObjectArray(new Animals(AnimalMetaData[item.name], item.positionX, item.positionY, index))
      });
    if (NPCSpawnList[this.currentNode.name] !== undefined)
      NPCSpawnList[this.currentNode.name].forEach((item, index) => {
        if (item.direction)
          PushGameObjectArray(new NPC(NpcMetaData[item.name], item.positionX, item.positionY, index))
      });
  }

  addProjectile(data) {
    PushGameObjectArray(new Projetile(data[0], data[1], data[2], data[3], data[4]))
  }

  addAnimation(data) {
    PushGameObjectArray(new Animation(AnimationMetaData[data[0]], data[1], data[2], data[3] ? false : true))
  }

  updateScore(score) {
    this.Score += score;
  }

  updateAdjacentList(list, name, index) {
    if (list[name][index].direction === 1) return;
    list[name][index].direction = 0;
  }

  openLetter() {
    if (!canClose && LetterMetaData[this.currentNode.name]) {
      letter(LetterMetaData[this.currentNode.name]);
    }
  }

  closeLetter() {
    closeLetter()
  }

  fade() {
    if (this.fadeState) return;
    this.fadeState = true;
    this.alpha = 1;
    const fadeStepOut = -(1 / (350 / 16));
    const fadeStepIn = 1 / (700 / 16);
    const fadeOutInterval = setInterval(() => {
      this.alpha += fadeStepOut;
      if (this.alpha <= 0) {
        this.alpha = 0;
        clearInterval(fadeOutInterval);
        setTimeout(() => {
          const fadeInInterval = setInterval(() => {
            this.alpha += fadeStepIn;
            if (this.alpha >= 1) {
              this.alpha = 1;
              this.fadeState = false;
              clearInterval(fadeInInterval);
            }
            ctx.globalAlpha = this.alpha;
          }, 16);
        }, 650);
      }
      ctx.globalAlpha = this.alpha;
    }, 16);
  }

}
