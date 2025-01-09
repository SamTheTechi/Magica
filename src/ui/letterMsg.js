import { container } from "../store/canvas";

const letterMessage = document.createElement('div');
const letterContainer = document.createElement('div');
const letterCloseBtn = document.createElement('div');
letterMessage.className = `letterMessage`;
letterContainer.className = `letterContainer`;
letterCloseBtn.className = `letterCloseBtn`;
letterMessage.appendChild(letterContainer);
letterMessage.appendChild(letterCloseBtn)
container.appendChild(letterMessage);

export let canClose = false;

export const letter = (message) => {
  canClose = false;
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
          letterCloseBtn.innerHTML = `Enter To Close`;
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
    letterContainer.innerHTML = '';
    letterCloseBtn.innerHTML = '';
    letterMessage.style.top = '200%';
    canClose = false;
  }
}

