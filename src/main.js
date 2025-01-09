import { eventEmmiter, EventMaping } from './util/eventBinding';
import { container, ctx, canvasHeight, canvasWidth } from './store/canvas';
import { keybindings } from './util/keybinding';
import { UpdateGameLoop } from './updateLoop';
import { EventListener } from './eventListener';
import { Camera, Hero } from './declare';
import { preventDefaultBehavior } from './util/preventKeys';
import { touchPads } from './ui/touchpad';
import { detectDevice } from './util/detectDevice';


const full = () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
    });
  }
}

document.getElementById('button').addEventListener('click', full);

const FPS = 59;
const interval = 1000 / FPS;
let lastTime = 0;

const animation = (currentTime) => {
  const changeTime = currentTime - lastTime;

  if (changeTime > interval) {
    lastTime = currentTime - (changeTime % interval);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    Camera.update(Hero.positionY, Hero.positionX);
    UpdateGameLoop(Camera);
  }
  requestAnimationFrame(animation)
};

const draw = () => {
  if (detectDevice()) touchPads();
  EventListener();
  animation();
  keybindings();
  preventDefaultBehavior();
}


window.onload = async () => draw();

eventEmmiter.on(EventMaping.RESIZE, () => {
  console.log(canvasWidth)
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  Camera.reset();
  draw();
});
