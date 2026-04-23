const appState = {
  currentDifficulty: null,
  isGameActive: false,
  board: null,
  timerId: null,
};

function renderLayout() {
  const root = document.querySelector('#game-root');
  if (!root) return;
  root.innerHTML = '';
}

function createBoardPlaceholder() {
  const root = document.querySelector('#game-root');
  if (!root) return;
  const board = document.createElement('div');
  board.className = 'board-placeholder-grid';
  board.textContent = 'Board placeholder';
  root.appendChild(board);
}

function registerEventHandlers() {
  const restart = document.querySelector('.restart');
  if (!restart) return;
  restart.addEventListener('click', () => {
    console.log('Restart clicked');
  });
}

function initializeApp() {
  renderLayout();
  createBoardPlaceholder();
  registerEventHandlers();
  console.log('PXL Sweeper initialized', appState);
}

document.addEventListener('DOMContentLoaded', initializeApp);

export { initializeApp, appState };
