import { detectOrientaion } from "../util/detectOrientaion";

const canvas = document.querySelector('#canvas');
export const ctx = canvas.getContext('2d');


const updateCanvasSize = () => {
  const ratio = 2 / 3;
  const ScalingFactor = window.devicePixelRatio / 1.55 || 1.55;
  let windowHeight = window.innerHeight * ScalingFactor;
  let windowWidth = window.innerWidth * ScalingFactor;
  let newHeight;
  let newWidth;

  if (windowHeight <= windowWidth) {
    newHeight = windowHeight;
    newWidth = windowHeight / ratio;
  }
  else {
    newHeight = windowWidth * ratio;
    newWidth = windowWidth;
  }

  canvas.height = newHeight;
  canvas.width = newWidth;

  canvas.style.height = `${newHeight / ScalingFactor - 5}px`
  canvas.style.width = `${newWidth / ScalingFactor}px`
};

const positionChange = () => {
  if (detectOrientaion()) {
    canvas.style.top = "40%"
  } else {
    canvas.style.top = "50%"
  }
}

window.addEventListener('resize', updateCanvasSize)
window.addEventListener('orientationchange', positionChange)

updateCanvasSize();
positionChange();


export const canvasHeight = canvas.height
export const canvasWidth = canvas.width
