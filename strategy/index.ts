import PaymentFactory from "./payment-factory";

function processPayment(amount: number, method: string) {
  const paymentFactory = PaymentFactory.createPaymentMethod(method);
  paymentFactory.pay(amount);
  paymentFactory.method(method);
}

processPayment(100, "stripe");
processPayment(100, "paypal");
processPayment(100, "unknown");
