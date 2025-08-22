import PaymentStrategy from "./payment-strategy";

class CreditCardStrategy implements PaymentStrategy {
  creditCardNumber: Number;

  constructor(creditCardNumber: Number) {
    this.creditCardNumber = creditCardNumber;
  }
  method(name: string): void {
    console.log("Payment method: ".concat(name));
  }
  pay(amount) {
    console.log("Paying ".concat(amount, " using Credit Card."));
  }
}

export default CreditCardStrategy;
