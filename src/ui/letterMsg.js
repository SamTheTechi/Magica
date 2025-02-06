import { container, canvasWidthS, canvasHeightS } from "../store/canvas";
import { detectDevice } from "../util/detectDevice";
import { eventEmmiter } from "../util/eventBinding";
import { EventMaping } from "../util/eventBinding";
import { Music } from "../declare";


const letterMessage = document.createElement('div');
const letterContainer = document.createElement('div');
const letterCloseBtn = document.createElement('div');
Object.assign(letterMessage.style, {
  minHeight: `${canvasHeightS - 50}px`,
  minWidth: `${canvasWidthS - 50}px`,
});
letterMessage.className = `letterMessage`;
letterContainer.className = `letterContainer`;
letterContainer.innerHTML = ``
letterCloseBtn.className = `letterCloseBtn`;
letterMessage.appendChild(letterContainer);
letterMessage.appendChild(letterCloseBtn)
container.appendChild(letterMessage);
letterMessage.addEventListener('touchstart', () => {
  eventEmmiter.emit(EventMaping.ENTER_KEY)
})

export let canClose = false;

export const letter = (message) => {
  canClose = false;
  Music.playAudio('menu')
  const showable = message.split('');
  let final = "";
  letterMessage.style.top = '48%';
  setTimeout(() => {
    letterMessage.style.top = '50%';
    setTimeout(() => {
      const time = setInterval(() => {
        if (showable.length > 0) {
          final += showable.shift();
          letterContainer.innerHTML = `${final}`
        } else {
          if (detectDevice()) {
            letterCloseBtn.innerHTML = `Press To Close`;
          } else {
            letterCloseBtn.innerHTML = `Enter To Close`;
          }
          clearInterval(time)
          canClose = true;
        }
      }, 40)
    }, 500)
  }, 500)
}

export const forceCloseLetter = () => {
  canClose = false;
  letterContainer.innerHTML = '';
  letterCloseBtn.innerHTML = '';
  letterMessage.style.top = '200%';
}

export const closeLetter = () => {
  if (canClose) {
    Music.playAudio('menu')
    letterContainer.innerHTML = '';
    letterCloseBtn.innerHTML = '';
    letterMessage.style.top = '200%';
    canClose = false;
  }
}
eventEmmiter.on(EventMaping.GAME_START, () => {
  //letter(`The Flame Deamon has Taken over the world. Break its fiery grip, or burn with the world!....`);
})
