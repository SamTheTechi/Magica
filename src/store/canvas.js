import { detectOrientaion } from "../util/detectOrientaion";
import { detectDevice } from "../util/detectDevice";
import { eventEmmiter, EventMaping } from "../util/eventBinding";

const canvas = document.querySelector('#canvas');
export const container = document.getElementById('continer')
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

  if (detectOrientaion()) {
    ratio = 3 / 4;
    canvas.style.top = "40%";
  } else {
    ratio = 9 / 16;
    canvas.style.top = "50%";
  }

};
window.addEventListener('resize', () => {
  console.log('Resizing...');
  updateCanvasSize();
  eventEmmiter.emit(EventMaping.REDRAW);
});



export const canvasHeight = canvas.height
export const canvasWidth = canvas.width
