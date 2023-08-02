const gameBoard = (() => {
  const board = (...arr) => [arr];
  return {
    board,
  };
})();

const displayController = (() => {
  const render = (obj) => obj;
  return {
    render,
  };
})();

const playerController = (player, markSelection) => {
  const markSelection = () => console.log("You selected a cross or nought");
  return { player, markSelection };
};

console.log(gameBoard.board(4, 5, 2));
// Make a gameboard module that stores the gameboard array
// Make a display module that handles the display
// Make a factory function for the players
