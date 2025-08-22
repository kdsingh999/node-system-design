import Grid from "./grid";
import Player from "./player";

class Game {
  constructor(public playerX: Player, public playerO: Player) {}

  play() {
    const grid = new Grid(
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      this.playerX
    );
    grid.play(0, 0);
  }
}
