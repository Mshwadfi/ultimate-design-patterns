"use strict";
//we want to handle order details, process payments and send notfications
Object.defineProperty(exports, "__esModule", { value: true });
// create a single order class with processPayment & sendNotfications Methods  X violation :
// class Order {
//     private orderId: number;
//     private amount: number;
//     constructor(orderId: number, amount: number) {
//       this.orderId = orderId;
//       this.amount = amount;
//     }
//     processPayment(paymentMethod: string): void {
//       console.log(
//         `Processing payment of $${this.amount} using ${paymentMethod}`
//       );
//     }
//     sendNotification(): void {
//       console.log(`Sending notification for order ${this.orderId}`);
//     }
//   }
//   const order = new Order(1, 50);
//   order.processPayment("PayPal");
//   order.sendNotification();
//----------------------------------------------------------- Applying SRP---------------------------------------------------------------
// construct separate class for each
// class for order
class Order {
    orderId;
    amount;
    constructor(orderId, amount) {
        this.orderId = orderId;
        this.amount = amount;
    }
    getOrderId() {
        return this.orderId;
    }
    getAmount() {
        return this.amount;
    }
    getOrderDetails() {
        return `Order ID: ${this.orderId}, Amount: $${this.amount}`;
    }
}
// class for payment
class PaymentService {
    processPayment(order, paymentMethod) {
        console.log(`Processing payment of $${order.getAmount()} for Order ID ${order.getOrderId()} using ${paymentMethod}`);
    }
}
// class for notifications
class NotificationService {
    sendNotification(order) {
        console.log(`Sending notification for Order ID ${order.getOrderId()}`);
    }
}
const order1 = new Order(1, 50);
const paymentService = new PaymentService();
const notificationService = new NotificationService();
paymentService.processPayment(order1, "InstaPay");
notificationService.sendNotification(order1);
