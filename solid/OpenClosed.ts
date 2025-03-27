//open close => we want to design a class that process payment for our orders and we have various types of payment methods

//violation
// if we want to add a new payment method, we need to modify the code and add another else if block
// class ProcessPayment{
//     process(paymentMethod){
//         if (paymentMethod === "Visa") {
//             console.log("Processing payment using Visa.");
//           } else if (paymentMethod === "MasterCard") {
//             console.log("Processing payment using MasterCard.");
//           } else if (paymentMethod === "InstaPay") {
//             console.log("Processing payment using InstaPay.");
//           } else if (paymentMethod === "PayPal") {
//             console.log("Processing payment using PayPal.");
//           } else {
//             console.log("Invalid payment method.");
//         }
//     }
// }

// const paymentProcessor = new ProcessPayment();
// paymentProcessor.process("Visa");
// paymentProcessor.process("PayPal");

//---------------------------------------applying open closed principle---------------------------------------------

// create an interface that has processPayment methode, for each payment methode create a class that implements the interface and our class will only have to implement this payment method
interface PaymentMethod {
  processPayment(): void;
}

class VisaPayment implements PaymentMethod {
  processPayment(): void {
    console.log("Processing payment using Visa.");
  }
}

class MastercardPayment implements PaymentMethod {
  processPayment(): void {
    console.log("Processing payment using MasterCard.");
  }
}

class InstaPayPayment implements PaymentMethod {
  processPayment(): void {
    console.log("Processing payment using InstaPay.");
  }
}

class PayPalPayment implements PaymentMethod {
  processPayment(): void {
    console.log("Processing payment using PayPal.");
  }
}

class ProcessPayment {
  private paymentMethod: PaymentMethod;
  constructor(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }
  processPayment(): void {
    this.paymentMethod.processPayment();
  }
}
const paymentMethod = new ProcessPayment(new PayPalPayment());
paymentMethod.processPayment();
const InstaPayPaymentMethode = new ProcessPayment(new InstaPayPayment());
InstaPayPaymentMethode.processPayment();
