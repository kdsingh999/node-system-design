import ProductStrategy from "./product-strategy";
import { ProductDTO } from "./productDTO";

class VariableProductStrategy implements ProductStrategy {
  createProduct(product: ProductDTO): Product {
    console.log(product);
    return;
  }

  priceCalculator(product: ProductDTO): number {
    console.log(product);
    return 0;
  }
}
