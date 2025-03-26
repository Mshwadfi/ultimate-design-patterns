// The Single Responsibility Principle (SRP) states that
//  a class should have only one reason to change, meaning
//   it should only have one responsibility or purpose. In essence,
//    a class should focus on doing one thing well.


//here the order class violates the single responsipility,
// it’s responsible for both handling payments and sending notifications.
//  If the notification method changes (e.g., switching from email to SMS),
//   the Order class must be modified, which is unrelated to 
//   its main responsibility of managing orders. 

class Order{
    constructor(orderId, amount){
        this.orderId = orderId;
        this.amount = amount;
    }
    proccessPayment(paymentMethod){
        console.log(`Processing payment of $${this.amount} using ${paymentMethod}`);
    }

    sendNotification(){
        console.log(`Sending notification for order ${this.orderId}`);
    }
}

const order = new Order(1, 3);
order.proccessPayment('paypal');
order.sendNotification();

// applying SRP

class Order_r{
    constructor(orderId, amount){
        this.orderId = orderId;
        this.amount = amount;
    }

    getOrderDetails(){
        return `Order ID: ${this.orderId}, Amount: $${this.amount}`;
    }
}

class PaymentService {
    processPayment(order, paymentMethod) {
      console.log(`Processing payment of $${order.amount} for Order ID ${order.orderId} using ${paymentMethod}`);
    }
}

class NotificationService {
    sendNotification(order) {
      console.log(`Sending notification for Order ID ${order.orderId}`);
    }
}

const order1 = new Order_r(1,4);

const paymentService = new PaymentService();
paymentService.processPayment(order1, 'instaPay');

const notificationService = new NotificationService(); 
notificationService.sendNotification(order1);

  
  