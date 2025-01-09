import { container } from "../store/canvas";

const gameScore = document.createElement('div');
gameScore.className = `gameScore`;
container.appendChild(gameScore);

export const UpdateScore = (score) => {
  gameScore.innerHTML = `${score}`
}
