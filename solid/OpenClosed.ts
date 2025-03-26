//open close 

//violation
// if we want to add a new payment method, we need to modify the code
class ProcessPayment{
    process(paymentMethod){
        if (paymentMethod === "Visa") {
            console.log("Processing payment using Visa.");
          } else if (paymentMethod === "MasterCard") {
            console.log("Processing payment using MasterCard.");
          } else if (paymentMethod === "InstaPay") {
            console.log("Processing payment using InstaPay.");
          } else if (paymentMethod === "PayPal") {
            console.log("Processing payment using PayPal.");
          } else {
            console.log("Invalid payment method.");
        }
    }
}

// const paymentProcessor = new ProcessPayment();
// paymentProcessor.process("Visa");
// paymentProcessor.process("PayPal");

//applying open closed principle

interface PaymentMethod{
   processPayment(): void;
}

class VisaPayment implements PaymentMethod{
  processPayment(): void {
    console.log("Processing payment using Visa.");
  }
}

class MastercardPayment implements PaymentMethod{
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

class ProcessPayment_1{
  private paymentMethod: PaymentMethod;
  constructor(paymentMethod: PaymentMethod){
    this.paymentMethod = paymentMethod;
  }
  processPayment():void{
    this.paymentMethod.processPayment();
  }
}
const paymentMethod = new ProcessPayment_1(new PayPalPayment());
paymentMethod.processPayment();
