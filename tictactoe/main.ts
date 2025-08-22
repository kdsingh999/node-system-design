import Player from "./player";

function main() {
  const playerX = new Player("X", "X");
  const playerO = new Player("O", "O");
  const game = new Game(playerX, playerO);
  game.play();
}
