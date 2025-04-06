import { IPaymentStrategy } from "./IPaymentStrategy";

export class Checkout {
  constructor(private paymentStrategy: IPaymentStrategy) {}

  processPayment(amount: number): void {
    this.paymentStrategy.processPayment(amount);
  }
}
