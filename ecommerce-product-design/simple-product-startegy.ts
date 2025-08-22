import ProductStrategy from "./product-strategy";

interface SimpleProductDTO {
  name: string;
  description: string;
  type: string;
  sku: string;
  isActive: boolean;
  quantity: number;
  price: number;
}

class SimpleProductStrategy implements ProductStrategy {
  createProduct(product: SimpleProductDTO): void {
    console.log(product);
  }
}
