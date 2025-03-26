//open close 
//violation
// if we want to add a new payment method, we need to modify the code
var ProcessPayment = /** @class */ (function () {
    function ProcessPayment() {
    }
    ProcessPayment.prototype.process = function (paymentMethod) {
        if (paymentMethod === "Visa") {
            console.log("Processing payment using Visa.");
        }
        else if (paymentMethod === "MasterCard") {
            console.log("Processing payment using MasterCard.");
        }
        else if (paymentMethod === "InstaPay") {
            console.log("Processing payment using InstaPay.");
        }
        else if (paymentMethod === "PayPal") {
            console.log("Processing payment using PayPal.");
        }
        else {
            console.log("Invalid payment method.");
        }
    };
    return ProcessPayment;
}());
var VisaPayment = /** @class */ (function () {
    function VisaPayment() {
    }
    VisaPayment.prototype.processPayment = function () {
        console.log("Processing payment using Visa.");
    };
    return VisaPayment;
}());
var MastercardPayment = /** @class */ (function () {
    function MastercardPayment() {
    }
    MastercardPayment.prototype.processPayment = function () {
        console.log("Processing payment using MasterCard.");
    };
    return MastercardPayment;
}());
var InstaPayPayment = /** @class */ (function () {
    function InstaPayPayment() {
    }
    InstaPayPayment.prototype.processPayment = function () {
        console.log("Processing payment using InstaPay.");
    };
    return InstaPayPayment;
}());
var PayPalPayment = /** @class */ (function () {
    function PayPalPayment() {
    }
    PayPalPayment.prototype.processPayment = function () {
        console.log("Processing payment using PayPal.");
    };
    return PayPalPayment;
}());
var ProcessPayment_1 = /** @class */ (function () {
    function ProcessPayment_1(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    ProcessPayment_1.prototype.processPayment = function () {
        this.paymentMethod.processPayment();
    };
    return ProcessPayment_1;
}());
var paymentMethod = new ProcessPayment_1(new PayPalPayment());
paymentMethod.processPayment();
