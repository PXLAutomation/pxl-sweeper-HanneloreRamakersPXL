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

function createGameBoard() {
  const root = document.querySelector('#game-root');
  if (!root) return;
  
  // Create the board container
  const board = document.createElement('div');
  board.className = 'game-board';
  
  // For now, create a simple 9x9 grid (Beginner difficulty)
  const rows = 9;
  const cols = 9;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tile = document.createElement('div');
      tile.className = 'tile hidden';
      tile.dataset.row = row;
      tile.dataset.col = col;
      tile.addEventListener('click', handleTileClick);
      board.appendChild(tile);
    }
  }
  
  root.innerHTML = '';
  root.appendChild(board);
}

function handleTileClick(event) {
  const tile = event.target;
  if (tile.classList.contains('hidden')) {
    tile.classList.remove('hidden');
    tile.classList.add('revealed');
    // For now, show a random number 0-8 (0 means empty)
    const number = Math.floor(Math.random() * 9);
    tile.textContent = number > 0 ? number : '';
    tile.dataset.number = number;
    console.log(`Tile clicked: (${tile.dataset.row}, ${tile.dataset.col}) - Number: ${number}`);
  } else if (tile.classList.contains('revealed')) {
    // Allow toggling back to hidden for testing
    tile.classList.remove('revealed');
    tile.classList.add('hidden');
    tile.textContent = '';
    tile.dataset.number = '';
    console.log(`Tile hidden: (${tile.dataset.row}, ${tile.dataset.col})`);
  }
}

function registerEventHandlers() {
  const restart = document.querySelector('.restart');
  if (!restart) return;
  restart.addEventListener('click', () => {
    console.log('Restart clicked');
    createGameBoard(); // Recreate board on restart
  });
}

function initializeApp() {
  renderLayout();
  createGameBoard(); // Create actual board instead of placeholder
  registerEventHandlers();
  console.log('PXL Sweeper initialized', appState);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initializeApp);
}

export { initializeApp, appState };
