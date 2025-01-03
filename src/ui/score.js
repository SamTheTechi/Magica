const gameScore = document.createElement('div');
gameScore.className = `gameScore`;
document.body.appendChild(gameScore);

export const UpdateScore = (score) => {
  gameScore.innerHTML = `${score}`
}
