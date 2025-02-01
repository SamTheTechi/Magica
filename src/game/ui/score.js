import { container } from "../store/canvas";
import { canvasWidthS, canvasHeightS } from "../store/canvas";

const scoreContainer = document.createElement('div');
const gameScore = document.createElement('div');
Object.assign(scoreContainer.style, {
  height: `${canvasHeightS - 75}px`,
  width: `${canvasWidthS - 50}px`,
});
scoreContainer.className = `scoreContainer`
gameScore.className = `gameScore`;
scoreContainer.appendChild(gameScore)
container.appendChild(scoreContainer);

export const UpdateScore = (score) => {
  gameScore.innerHTML = `${score}`
}
