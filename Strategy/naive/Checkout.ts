import { PAYMENT_METHODS } from "./PaymentMethods";

class Checkout {
  constructor() {}
  processPayment(amount: string, paymentMethod: string) {
    if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
      console.log("processing payment of" + amount + " with paypal...");
    } else if (paymentMethod === PAYMENT_METHODS.VISA) {
      console.log("processing payment of" + amount + " with visa...");
    } else if (paymentMethod === PAYMENT_METHODS.INSTAPAY) {
      console.log("processing payment of" + amount + " with instapay...");
    }
  }
}
