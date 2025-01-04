import { detectOrientaion } from "../util/detectOrientaion";
import { detectDevice } from "../util/detectDevice";

const canvas = document.querySelector('#canvas');
export const ctx = canvas.getContext('2d');
const adjecement = detectDevice() ? 1.4 : 1.7;
const ScalingFactor = window.devicePixelRatio / adjecement || adjecement;
let ratio = 9 / 16;

const updateCanvasSize = () => {
  const windowHeight = window.innerHeight * ScalingFactor;
  const windowWidth = window.innerWidth * ScalingFactor;

  let newHeight, newWidth;

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
  resetCanvasTransform()
};

const positionChange = () => {
  if (detectOrientaion()) {
    ratio = 3 / 4;
    canvas.style.top = "40%";
  } else {
    ratio = 9 / 16;
    canvas.style.top = "50%";
  }
  resetCanvasTransform()
}

const resetCanvasTransform = () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, 0);
};

window.addEventListener('resize', updateCanvasSize)
window.addEventListener('orientationchange', positionChange)

updateCanvasSize();
positionChange();


export const canvasHeight = canvas.height
export const canvasWidth = canvas.width
