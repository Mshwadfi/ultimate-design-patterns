"use strict";
// high-level modules should not depend directly
//  on low-level modules; instead, both should rely on
//   abstractions, such as interfaces or abstract classes.
Object.defineProperty(exports, "__esModule", { value: true });
//2- implement low lwvel module
class StripePaymentProcessor {
    processPayment(amount) {
        console.log(`Processing payment of $${amount} through Stripe.`);
        return true;
    }
}
class PayPalPaymentProcessor {
    processPayment(amount) {
        console.log(`Processing payment of $${amount} through PayPal.`);
        return true;
    }
}
// 3-Refactor High-Level Module
// Now, we modify CheckoutService to depend on the PaymentProcessor
//  interface instead of a concrete implementation.
class CheckoutService {
    paymentProcessor;
    constructor(paymentProcessor) {
        // Dependency Injection
        this.paymentProcessor = paymentProcessor;
    }
    checkout(amount) {
        if (this.paymentProcessor.processPayment(amount)) {
            console.log("Checkout successful!");
        }
        else {
            console.log("Checkout failed.");
        }
    }
}
const paypalProcessor = new PayPalPaymentProcessor();
const checkoutWithPaypal = new CheckoutService(paypalProcessor);
checkoutWithPaypal.checkout(200);
