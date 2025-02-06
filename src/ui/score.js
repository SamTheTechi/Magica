import { container } from "../store/canvas";
import { canvasWidthS, canvasHeightS } from "../store/canvas";
import { detectDevice } from "../util/detectDevice";

const scoreContainer = document.createElement('div');
const gameScore = document.createElement('div');
Object.assign(scoreContainer.style, {
  height: `${canvasHeightS - 75}px`,
  width: `${canvasWidthS - 50}px`,
});
scoreContainer.className = `scoreContainer`
gameScore.className = `gameScore`;
gameScore.style.marginTop = detectDevice() ? '3%' : '5%';
scoreContainer.appendChild(gameScore)
container.appendChild(scoreContainer);

export const UpdateScore = (score) => {
  gameScore.innerHTML = `${score}`
}
