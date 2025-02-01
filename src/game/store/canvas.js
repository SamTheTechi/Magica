import { detectOrientaion } from "../util/detectOrientaion";
import { detectDevice } from "../util/detectDevice";

const canvas = document.querySelector('#canvas');
export const container = document.getElementById('continer');
export const ctx = canvas.getContext('2d')
const adjecement = detectDevice() ? 1.4 : 1.7;
const scalingFactor = window.devicePixelRatio / adjecement || adjecement;
let newHeight, newWidth;

const updateCanvasSize = () => {
  const windowHeight = window.innerHeight * scalingFactor;
  const windowWidth = window.innerWidth * scalingFactor;
  const aspectRatio = 9 / 16;

  if (detectDevice()) {
    if (detectOrientaion()) {
      newHeight = windowWidth * 0.9;
      newWidth = (windowWidth / aspectRatio) * 0.9;
    } else {
      newHeight = windowHeight * 1.1;
      newWidth = (windowHeight / aspectRatio) * 1.1;
    }
  } else {
    if (windowHeight / aspectRatio <= windowWidth) {
      newHeight = windowHeight;
      newWidth = newHeight / aspectRatio;
    } else {
      newWidth = windowWidth;
      newHeight = newWidth * aspectRatio;
    }
  }

  canvas.height = Math.round(newHeight);
  canvas.width = Math.round(newWidth);

  Object.assign(canvas.style, {
    height: `${Math.round(newHeight / scalingFactor)}px`,
    width: `${Math.round(newWidth / scalingFactor)}px`,
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute"
  });


};

updateCanvasSize();

export const canvasHeightS = Math.round(newHeight / scalingFactor)
export const canvasWidthS = Math.round(newWidth / scalingFactor)
export const canvasHeight = canvas.height
export const canvasWidth = canvas.width

