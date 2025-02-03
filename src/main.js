import { ctx, canvasHeight, canvasWidth } from './store/canvas';
import { keybindings } from './util/keybinding';
import { UpdateGameLoop } from './updateLoop';
import { EventListener } from './eventListener';
import { Camera } from './declare';
import { preventDefaultBehavior } from './util/preventKeys';
import { touchPads } from './ui/touchpad';
import { detectDevice } from './util/detectDevice';
import { eventEmmiter, EventMaping } from './util/eventBinding';

const FPS = 59;
const interval = 1000 / FPS;
let lastTime = 0;

const animation = (currentTime, Hero) => {
  const changeTime = currentTime - lastTime;
  if (changeTime > interval) {
    lastTime = currentTime - (changeTime % interval);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    Camera.trace(Hero.positionY, Hero.positionX);
    UpdateGameLoop(Camera);
  }
  requestAnimationFrame((time) => animation(time, Hero))
};

const draw = (val) => {
  if (detectDevice()) touchPads();
  EventListener(val);
  animation(0, val);
  keybindings();
  preventDefaultBehavior();
}

eventEmmiter.on(EventMaping.GAME_START, (_, val) => {
  draw(val)
})

