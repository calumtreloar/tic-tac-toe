const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const squareElements = document.querySelectorAll("[data-square]");
const board = document.getElementById("board");
let circleTurn;
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById("restartButton");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  squareElements.forEach((square) => {
    square.classList.remove(X_CLASS);
    square.classList.remove(CIRCLE_CLASS);
    square.removeEventListener("click", handleClick);
    square.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

squareElements.forEach((square) => {
  square.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const square = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // placeMark
  placeMark(square, currentClass);
  // Check for Win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
  // Check for Draw
  // Switch turns
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...squareElements].every((square) => {
    return square.classList.contains(X_CLASS) || square.classList.contains(CIRCLE_CLASS);
  });
}

function placeMark(square, currentClass) {
  square.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return squareElements[index].classList.contains(currentClass);
    });
  });
}
