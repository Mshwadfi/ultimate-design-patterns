// high-level modules should not depend directly
//  on low-level modules; instead, both should rely on
//   abstractions, such as interfaces or abstract classes.


//violation

// Imagine we have a simple e-commerce application where 
// a CheckoutService directly depends on a specific payment processor, 
// such as StripePaymentProcessor. This creates tight coupling
//  between the high-level module (CheckoutService) and the low-level
//   module (StripePaymentProcessor).

class StripePaymentProcessor {
    processPayment(amount: number): boolean {
        console.log(`Processing payment of $${amount} through Stripe.`);
        return true;
    }
}

class CheckoutService {
    private stripeProcessor: StripePaymentProcessor;

    constructor() {
        this.stripeProcessor = new StripePaymentProcessor(); // Direct dependency
    }

    checkout(amount: number): void {
        if (this.stripeProcessor.processPayment(amount)) {
            console.log("Checkout successful!");
        } else {
            console.log("Checkout failed.");
        }
    }
}

// Usage
const checkoutService = new CheckoutService();
checkoutService.checkout(100);

// Issues with This Approach
// Tight Coupling: CheckoutService is tightly coupled to 
// StripePaymentProcessor. If we want to switch to another payment
//  processor (e.g., PayPal), we need to modify CheckoutService.
// Difficult Testing: Testing CheckoutService in isolation becomes 
// challenging since it directly instantiates StripePaymentProcessor.
// Limited Flexibility: Adding new payment processors requires changes 
// in multiple places in the codebase.


//Apply the DIP

// 1-Define an Interface
interface PaymentProcessor {
    processPayment(amount: number): boolean;
}

//2- implement low lwvel module
class StripePaymentProcessor_ implements PaymentProcessor {
    processPayment(amount: number): boolean {
        console.log(`Processing payment of $${amount} through Stripe.`);
        return true;
    }
}

class PayPalPaymentProcessor implements PaymentProcessor {
    processPayment(amount: number): boolean {
        console.log(`Processing payment of $${amount} through PayPal.`);
        return true;
    }
}

// 3-Refactor High-Level Module
// Now, we modify CheckoutService to depend on the PaymentProcessor
//  interface instead of a concrete implementation.
class CheckoutService_ {
    private paymentProcessor: PaymentProcessor;

    constructor(paymentProcessor: PaymentProcessor) { // Dependency Injection
        this.paymentProcessor = paymentProcessor;
    }

    checkout(amount: number): void {
        if (this.paymentProcessor.processPayment(amount)) {
            console.log("Checkout successful!");
        } else {
            console.log("Checkout failed.");
        }
    }
}

const paypalProcessor = new PayPalPaymentProcessor();

const checkoutWithPaypal = new CheckoutService_(paypalProcessor);
checkoutWithPaypal.checkout(200);
