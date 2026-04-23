const appState = {
  currentDifficulty: null,
  isGameActive: false,
  board: null,
  timerId: null,
  mineCount: 10, // For beginner
  flagCount: 0,
  gameOver: false,
  win: false,
};

function generateBoard(rows, cols, mines) {
  const board = [];
  // Initialize empty board
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = {
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborCount: 0,
      };
    }
  }
  
  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      minesPlaced++;
    }
  }
  
  // Calculate neighbor counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
              count++;
            }
          }
        }
        board[r][c].neighborCount = count;
      }
    }
  }
  
  return board;
}

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
  const mines = 10;
  
  appState.board = generateBoard(rows, cols, mines);
  appState.mineCount = mines;
  appState.flagCount = 0;
  appState.gameOver = false;
  appState.win = false;
  appState.isGameActive = true;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tile = document.createElement('div');
      tile.className = 'tile hidden';
      tile.dataset.row = row;
      tile.dataset.col = col;
      tile.addEventListener('click', handleTileClick);
      tile.addEventListener('contextmenu', handleTileRightClick);
      board.appendChild(tile);
    }
  }
  
  root.innerHTML = '';
  root.appendChild(board);
  updateMineCounter();
}

function handleTileClick(event) {
  event.preventDefault();
  if (appState.gameOver || appState.win) return;
  
  const tile = event.target;
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);
  const cell = appState.board[row][col];
  
  if (cell.isRevealed) return;
  
  // Toggle flag
  if (cell.isFlagged) {
    cell.isFlagged = false;
    appState.flagCount--;
    tile.classList.remove('flagged');
    tile.textContent = '';
  } else {
    cell.isFlagged = true;
    appState.flagCount++;
    tile.classList.add('flagged');
    tile.textContent = '🚩';
  }
  updateMineCounter();
}

function handleTileRightClick(event) {
  event.preventDefault();
  if (appState.gameOver || appState.win) return;
  
  const tile = event.target;
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);
  const cell = appState.board[row][col];
  
  if (cell.isFlagged || cell.isRevealed) return;
  
  // Reveal the cell
  revealCell(row, col);
}

function revealCell(row, col) {
  const cell = appState.board[row][col];
  if (cell.isRevealed || cell.isFlagged) return;
  
  cell.isRevealed = true;
  const tile = document.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`);
  tile.classList.remove('hidden');
  tile.classList.add('revealed');
  
  if (cell.isMine) {
    // Game over
    tile.textContent = '💣';
    tile.classList.add('mine');
    gameOver();
    return;
  }
  
  tile.textContent = cell.neighborCount > 0 ? cell.neighborCount : '';
  tile.dataset.number = cell.neighborCount;
  
  // If empty, reveal neighbors
  if (cell.neighborCount === 0) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < 9 && nc >= 0 && nc < 9) {
          revealCell(nr, nc);
        }
      }
    }
  }
  
  checkWinCondition();
}

function gameOver() {
  appState.gameOver = true;
  appState.isGameActive = false;
  // Reveal all mines
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = appState.board[r][c];
      if (cell.isMine && !cell.isFlagged) {
        const tile = document.querySelector(`.tile[data-row="${r}"][data-col="${c}"]`);
        tile.classList.remove('hidden');
        tile.classList.add('revealed', 'mine');
        tile.textContent = '💣';
      }
    }
  }
  alert('Game Over! You hit a mine.');
}

function checkWinCondition() {
  let revealedCount = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (appState.board[r][c].isRevealed) revealedCount++;
    }
  }
  if (revealedCount === 81 - appState.mineCount) {
    appState.win = true;
    appState.isGameActive = false;
    alert('Congratulations! You won!');
  }
}

function updateMineCounter() {
  const counter = document.querySelector('.counter');
  if (counter) {
    counter.textContent = `Mines: ${appState.mineCount - appState.flagCount}`;
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
