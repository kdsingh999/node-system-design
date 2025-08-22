class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
  writeLn() {
    console.log(`Product: ${this.name}, Price: $${this.price}`);
  }
}

export default Product;
