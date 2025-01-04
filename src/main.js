import { ctx, canvasHeight, canvasWidth } from './store/canvas';
import { keybindings } from './util/keybinding';
import { UpdateGameLoop } from './updateLoop';
import { EventListener } from './eventListener';
import { Camera, Hero } from './declare';
import { preventDefaultBehavior } from './util/preventKeys';
import { touchPads } from './ui/touchpad';
import { detectDevice } from './util/detectDevice';

const FPS = 59;
const interval = 1000 / FPS;
let lastTime = 0;

const animation = (currentTime) => {
  const changeTime = currentTime - lastTime;

  if (changeTime > interval) {
    lastTime = currentTime - (changeTime % interval);
    Camera.update(Hero.positionY, Hero.positionX);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    UpdateGameLoop(Camera);
  }
  requestAnimationFrame(animation)
};


window.onload = async () => {
  if (detectDevice()) touchPads();
  EventListener();
  animation();
  keybindings();
  preventDefaultBehavior();
}

