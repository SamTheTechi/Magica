import { Map } from "./declare";
import { detectDevice } from "./util/detectDevice";
import { EventMaping, eventEmmiter } from "./util/eventBinding";
const landing = document.querySelector(".landing");
const chars = document.querySelectorAll(".faceset");
const charScreen = document.querySelector(".selector")
const loading = document.querySelector("#loading-screen")
const container = document.getElementById('continer');
const conti = document.querySelector('.cont');
const gameOver = document.querySelector('.gameover');
const charlogo = document.querySelector('.charlogo');
const charimg = document.querySelector('.charimg');

const contir = () => {
  if (!detectDevice()) {
    conti.innerText = 'Enter to Continue';
  }
  conti.style.display = 'block';
}
contir()

chars.forEach(char => {
  char.addEventListener("click", () => {
    const foo = char.dataset.value;
    charScreen.classList.add("hide")
    charimg.src = `./Actor/Characters/${foo}/Faceset.png`;
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
  landing.classList.add("hide");
});

eventEmmiter.on(EventMaping.GAME_OVER, () => {
  gameOver.classList.add('show');
  const time = setTimeout(() => {
    window.location.reload();
    clearTimeout(time);
  }, 9000)
})

