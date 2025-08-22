import CreditCardStrategy from "./credit-card-strategy";
import PaypalStrategy from "./paypal-strategy";
import StripeStrategy from "./strip-strategy";
class PaymentFactory {
  static createPaymentMethod(type) {
    switch (type) {
      case "paypal":
        return new PaypalStrategy();
      case "stripe":
        return new StripeStrategy();
      case "credit-card":
        return new CreditCardStrategy();
      default:
        throw new Error("Payment method not found");
    }
  }
}

export default PaymentFactory;
