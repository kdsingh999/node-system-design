class GameIterator {
  index: number = 0;
  constructor(public game: string[][]) {
    this.game = game;
  }
  hasNext(): boolean {
    return this.index < this.game.length;
  }
  next(): string[] {
    return this.game[this.index++];
  }
}
