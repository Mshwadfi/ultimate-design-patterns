import { IPaymentStrategy } from "./IPaymentStrategy";

export class IstaPayPayment implements IPaymentStrategy {
  processPayment(amount: number): void {
    console.log("calculating transaction fees ...");
    console.log("processing payment with insta pay ...");
  }
}
