import { EventMaping, eventEmmiter } from "../game/util/eventBinding";
const container = document.getElementById('continer');


const full = () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
    });
    eventEmmiter.emit(EventMaping.GAME_START)
  }
}

document.getElementById('button').addEventListener('click', full);

