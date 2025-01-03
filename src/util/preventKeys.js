export const preventDefaultBehavior = async () => {
  window.addEventListener(`keydown`, (event) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '=')) {
      event.preventDefault();
    }
  })
  window.addEventListener('wheel', (event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }
  }, { passive: false })
};
