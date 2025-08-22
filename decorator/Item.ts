class Item {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
  showDetails() {
    console.log(`Item: ${this.name}, Price: $${this.price}`);
  }
}

class SilverCase extends Item {
  constructor(item: Item) {
    super(item.name, item.price);
    item.name += " (Silver)";
    item.price += 10;
  }
}
export { Item, SilverCase };
