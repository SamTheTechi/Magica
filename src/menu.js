import { Map } from "./declare";
import { detectDevice } from "./util/detectDevice";
import { EventMaping, eventEmmiter } from "./util/eventBinding";
import { Music } from "./declare";
const landing = document.querySelector(".landing");
const chars = document.querySelectorAll(".faceset");
const charScreen = document.querySelector(".selector")
const loading = document.querySelector("#loading-screen")
const container = document.getElementById('continer');
const conti = document.querySelector('.cont');
const gameOver = document.querySelector('.gameover');


const contir = () => {
  if (!detectDevice()) {
    conti.innerText = 'Click to Continue';
  }
  conti.style.display = 'block';
}
contir()

chars.forEach(char => {
  char.addEventListener("click", () => {
    const foo = char.dataset.value;
    Music.playAudio('accept');
    charScreen.classList.add("hide")
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      })
    }
    const time = setTimeout(() => {
      charScreen.style.display = 'none';
      clearTimeout(time);
    }, 500)
    eventEmmiter.emit(EventMaping.SELECT_CHAR, foo);
  });
})

const time = setInterval(() => {
  if (Map.Loading()) {
    loading.style.display = 'none';
    clearInterval(time);
  }
}, 500)

landing.addEventListener('click', () => {
  Music.playAudio('menu')
  landing.classList.add("hide");
});

eventEmmiter.on(EventMaping.GAME_OVER, () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => {
      console.error(`Error attempting to exit fullscreen mode: ${err.message} (${err.name})`);
    });
  }
  gameOver.classList.add('show');
  Music.stopAllAudio();
  Music.playAudio('gameover');
  const time = setTimeout(() => {
    window.location.reload();
    clearTimeout(time);
  }, 9000)
})

