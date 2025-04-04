"use strict";
//open close => we want to design a class that process payment for our orders and we have various types of payment methods
Object.defineProperty(exports, "__esModule", { value: true });
class VisaPayment {
    processPayment() {
        console.log("Processing payment using Visa.");
    }
}
class MastercardPayment {
    processPayment() {
        console.log("Processing payment using MasterCard.");
    }
}
class InstaPayPayment {
    processPayment() {
        console.log("Processing payment using InstaPay.");
    }
}
class PayPalPayment {
    processPayment() {
        console.log("Processing payment using PayPal.");
    }
}
class ProcessPayment {
    paymentMethod;
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    processPayment() {
        this.paymentMethod.processPayment();
    }
}
const paymentMethod = new ProcessPayment(new PayPalPayment());
paymentMethod.processPayment();
const InstaPayPaymentMethode = new ProcessPayment(new InstaPayPayment());
InstaPayPaymentMethode.processPayment();
