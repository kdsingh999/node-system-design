import ProductStrategy from "./product-strategy";
import { ProductDTO } from "./productDTO";

class VariableProductStrategy implements ProductStrategy {
  createProduct(product: ProductDTO): ProductDTO {
    console.log(product);
    return product;
  }

  priceCalculator(product: ProductDTO): number {
    console.log(product);
    return 0;
  }
}
