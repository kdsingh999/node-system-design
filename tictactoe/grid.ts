import Player from "./player";
class Grid {
  constructor(public grid: string[][], public currentPlayer: Player) {
    this.grid = grid;
    this.currentPlayer = currentPlayer;
  }

  play(row: number, col: number) {
    this.grid[row][col] = this.currentPlayer.symbol;
  }

  checkToWinOrDraw(): Boolean {
    for (let i = 0; i < 3; i++) {}

    // TODO

    return false;
  }
}

export default Grid;
