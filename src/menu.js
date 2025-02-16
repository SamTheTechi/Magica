import { Map } from "./declare";
import { detectOrientaion } from "./util/detectOrientaion";
import { detectDevice } from "./util/detectDevice";
import { EventMaping, eventEmmiter } from "./util/eventBinding";
import { Music } from "./declare";

const landing = document.querySelector(".landing");
const chars = document.querySelectorAll(".faceset");
const charScreen = document.querySelector(".selector");
const loading = document.querySelector("#loading-screen");
const container = document.getElementById("continer");
const conti = document.querySelector(".cont");
const gameOver = document.querySelector(".gameover");
const gameWon = document.querySelector(".gamewon");

const rcontainer = document.createElement("div");
const rotate = document.createElement("div");

rcontainer.className = "rotateContainer";
rotate.className = "rotateText";
rotate.innerHTML = "Rotate Your <br> Device";
rcontainer.appendChild(rotate);
document.body.appendChild(rcontainer);

const updateVisibility = () => {
  if (detectDevice() && detectOrientaion()) {
    rcontainer.classList.add("show");
  } else {
    rcontainer.classList.remove("show");
  }
};

updateVisibility();
window.addEventListener("orientationchange", updateVisibility);

const contir = () => {
  if (!detectDevice()) {
    conti.innerText = "Click to Continue";
  }
  conti.style.display = "block";
};
contir();

chars.forEach((char) => {
  char.addEventListener("click", () => {
    const foo = char.dataset.value;
    Music.playAudio("accept");
    charScreen.classList.add("hide");
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
        );
      });
    }
    const time = setTimeout(() => {
      charScreen.style.display = "none";
      clearTimeout(time);
    }, 500);
    eventEmmiter.emit(EventMaping.SELECT_CHAR, foo);
  });
});

container.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
      );
    });
  }
});

const time = setInterval(() => {
  if (Map.Loading()) {
    loading.style.display = "none";
    clearInterval(time);
  }
}, 500);

landing.addEventListener("click", () => {
  Music.playAudio("menu");
  landing.classList.add("hide");
});

eventEmmiter.on(EventMaping.GAME_OVER, () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => {
      console.error(
        `Error attempting to exit fullscreen mode: ${err.message} (${err.name})`,
      );
    });
  }
  gameOver.classList.add("show");
  Music.stopAllAudio();
  Music.playAudio("gameover");
  const time = setTimeout(() => {
    window.location.reload();
    clearTimeout(time);
  }, 7000);
});

eventEmmiter.on(EventMaping.GAME_WON, () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => {
      console.error(
        `Error attempting to exit fullscreen mode: ${err.message} (${err.name})`,
      );
    });
  }
  gameWon.classList.add("show");
  Music.stopAllAudio();
  const time = setTimeout(() => {
    window.location.reload();
    clearTimeout(time);
  }, 9000);
});
