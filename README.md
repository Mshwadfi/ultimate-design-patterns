# Ultimate Design Patterns

## **solid principles:**

### 1- single responsibility:

The Single Responsibility Principle (SRP) states that a class should have only one reason to change, meaning it should only have one responsibility or purpose. In essence, a class should focus on doing one thing well.

here the order class violates the single responsibility,
it’s responsible for both handling payments and sending notifications. If the notification method changes (e.g., switching from email to SMS), the Order class must be modified, which is unrelated to its main responsibility of managing orders.
Also Any update to one responsibility could affect others.

#### ❌ Violation

`class Order {`
`private orderId: number;`
`private amount: number;`

`constructor(orderId: number, amount: number) {`
`this.orderId = orderId;`
`this.amount = amount;`
`}`

`processPayment(paymentMethod: string): void {`
`console.log(`
`Processing payment of $${this.amount} using ${paymentMethod}`
`);`
`}`

`sendNotification(): void {`
`console.log(Sending notification for order ${this.orderId});`
`}`
`}`

`const order = new Order(1, 50);`
`order.processPayment("PayPal");`
`order.sendNotification();`

#### ✅Applying SRP

separate classes for each responsibility (order, payment, notfications)

`class Order {`
`private orderId: number;`
`private amount: number;`

`constructor(orderId: number, amount: number) {`
`this.orderId = orderId;`
`this.amount = amount;`
`}`

`getOrderId(): number {`
`return this.orderId;`
`}`

`getAmount(): number {`
`return this.amount;`
`}`

`getOrderDetails(): string {`
`return Order ID: ${this.orderId}, Amount: $${this.amount};`
`}`
`}`

`class PaymentService {`
`processPayment(order: Order, paymentMethod: string): void {`
`console.log(`
`Processing payment of $${order.getAmount()} for Order ID ${order.getOrderId()} using ${paymentMethod}`
`);`
`}`
`}`

`class NotificationService {`
`sendNotification(order: Order): void {`
`console.log(Sending notification for Order ID ${order.getOrderId()});`
`}`
`}`

`const order1 = new Order(1, 50);`
`const paymentService = new PaymentService();`
`const notificationService = new NotificationService();`

`paymentService.processPayment(order1, "InstaPay");`
`notificationService.sendNotification(order1);`

### 2- Open Closed

The **Open-Closed Principle** means you can **add new things** without **changing old ones**
في حالة شرائك تيشيرت جديد انت محتاج تضعه ف الدولاب بدون ما تعيد ترتيب الدولاب

we want to design a class that process payment for our orders and we have various types of payment methods

#### EX

we want to design a class that process payment for our orders and we have various types of payment methods

#### ❌ Violation

create class with multiple if else or switch statements
if we want to add a new payment method, we need to modify the code and add another else if block
`class ProcessPayment{`

`process(paymentMethod){`

`if (paymentMethod === "Visa") {`

`console.log("Processing payment using Visa.");`

`} else if (paymentMethod === "MasterCard") {`

`console.log("Processing payment using MasterCard.");`

`} else if (paymentMethod === "InstaPay") {`

`console.log("Processing payment using InstaPay.");`

`} else if (paymentMethod === "PayPal") {`

`console.log("Processing payment using PayPal.");`

`} else {`

`console.log("Invalid payment method.");`

`}`

`}`

`}`

`const paymentProcessor = new ProcessPayment();`

`paymentProcessor.process("Visa");`

`paymentProcessor.process("PayPal");`

#### ✅Applying Open Closed

create an interface that has processPayment methode, for each payment methode create a class that implements the interface and our class will only have to implement this payment method

`interface PaymentMethod {`

`processPayment(): void;`

`}`

`class VisaPayment implements PaymentMethod {`
  `processPayment(): void {`
    `console.log("Processing payment using Visa.");`
  `}`
`}`

`class MastercardPayment implements PaymentMethod {`
  `processPayment(): void {`
    `console.log("Processing payment using MasterCard.");`
  `}`
`}`

`class InstaPayPayment implements PaymentMethod {`
  `processPayment(): void {`
    `console.log("Processing payment using InstaPay.");`
  `}`
`}`

`class PayPalPayment implements PaymentMethod {`
  `processPayment(): void {`
    `console.log("Processing payment using PayPal.");`
  `}`
`}`

`class ProcessPayment {`
  `private paymentMethod: PaymentMethod;`

`constructor(paymentMethod: PaymentMethod) {`
    `this.paymentMethod = paymentMethod;`
  `}`

`processPayment(): void {`
    `this.paymentMethod.processPayment();`
  `}`
`}`

`const paymentMethod = new ProcessPayment(new PayPalPayment());`
`paymentMethod.processPayment();`

### 3- Liskov Substitution

a sub class should be able to replace the parent class without breaking the logic, if B is a subclass of A then B should work where ever A is used without changing the expected behavior.

#### ex:

we have class employee and subclasses for hourly and full time employees, each type of employees has a different logic for salary calculation

#### ❌ Violation

create a calculateSalary method in the employee class and override it in subclasses,
although part and full time are of the same type - Employee- if i call the calc salary
at both they will return different values.

`class Employee{`

`protected name : string;`
    `protected workHours: number;`

`constructor(name, workHours){`
        `this.name = name;`
        `this.workHours = workHours;`
    `}`

`calculateSalary(){`
        `return this.workHours * 10;`
    `}`
`}`

`class PartTimeEmployee extends Employee{`
    `calculateSalary(){`
        `return this.workHours * 20;`
    `}`
`}`

`class FullTimeEmployee extends Employee{`
    `calculateSalary(){`
        `return this.workHours * 15;`
    `}`

#### ✅ Applying LSP

since each employee has its own method to calc salary, them put this
method to interface and each one could implement it in its own.

`interface CalcSalary{`
    `calcSalary(): number;`
`}`

`class Employee{`
    `protected name : string;`
    `protected workHours: number;`
    `constructor(name, workHours){`
        `this.name = name;`
        `this.workHours = workHours;`
    `}`
`}`

`class PartTimeEmployee extends Employee implements CalcSalary{`
    `calcSalary(){`
        `return this.workHours * 30;`
    `}`
`}`

`class FullTimeEmployee_1 extends Employee implements CalcSalary{`
    `calcSalary(){`
        `return this.workHours * 20;`
    `}`
`}`

`const ali = new PartTimeEmployee('ali', 10);`
`ali.calcSalary();`
`const ahmed = new PartTimeEmployee('ahmed', 40);`
`ahmed.calcSalary();`

### 4- Interface Segregation Principle

**class should not be forced to implement methods it does not use**.
If an interface has too many methods, some classes will have to implement methods they don’t need, so divide this big interface into smaller ones where each class implements interface that has the exact methods it needs.

#### ex:

we have different types of vehicles like plane, car and boat

#### ❌ Violation

In this example, both Car and Plane classes implement the IVehicle interface. However,
each class is forced to implement methods that are irrelevant to its functionality.

`interface IVehicle {`
    `drive(): void;`
    `fly(): void;`
`}`

`class Car implements IVehicle {`

`drive(): void {`
        `console.log('Car is driving');`
    `}`

`fly(): void {`
        `throw new Error('Cars cannot fly');`
    `}`

`}`

`class Plane implements IVehicle {`

`drive(): void {`
        `throw new Error('Planes cannot drive');`
    `}`

`fly(): void {`
        `console.log('Plane is flying');`
    `}`

`}`

#### ✅ Applying ISP

create separate interface for car and plane.

`interface ICar {`
    `drive(): void;`
`}`

`interface IPlane {`
    `fly(): void;`
`}`

`class Car_ implements ICar {`
    `drive(): void {`
        `console.log('Car is driving');`
    `}`
`}`

`class Plane_ implements IPlane {`
    `fly(): void {`
        `console.log('Plane is flying');`
    `}`
`}`

### 5- Dependency Inversion

high-level modules should not depend directly on low-level modules; instead, both should rely on abstractions, such as interfaces or abstract classes.

#### ex:

checkout in ecommerce apps

#### ❌ Violation

Imagine we have a simple e-commerce application where a Checkout Service directly depends on a specific payment processor, such as Stripe Payment Processor. This creates tight coupling between the high-level module (Checkout Service) and the low-level module (Stripe Payment Processor).

`class StripePaymentProcessor {`

`processPayment(amount: number): boolean {`
        `console.log(`Processing payment of $${amount} through Stripe.`);`
        `return true;`
    `}`
`}`

`class CheckoutService {`

`private stripeProcessor: StripePaymentProcessor;`
    `constructor() {`
        `this.stripeProcessor = new StripePaymentProcessor(); // Direct dependency`
    `}`

`checkout(amount: number): void {`
        `if (this.stripeProcessor.processPayment(amount)) {`
            `console.log("Checkout successful!");`
        `} else {`
            `console.log("Checkout failed.");`
        `}`
    `}`
`}`

`const checkoutService = new CheckoutService();`
`checkoutService.checkout(100);`

Issues with This Approach
Tight Coupling: CheckoutService is tightly coupled to StripePaymentProcessor. If we want to switch to another payment processor (e.g., PayPal), we need to modify CheckoutService. Difficult Testing: Testing CheckoutService in isolation becomes challenging since it directly instantiates StripePaymentProcessor. Limited Flexibility: Adding new payment processors requires changes in multiple places in the codebase.

#### ✅ Applying DIP

`// 1-Define an Interface`
`interface PaymentProcessor {`
  `processPayment(amount: number): boolean;`
`}`

`//2- implement low lwvel module`
`class StripePaymentProcessor implements PaymentProcessor {`
  `processPayment(amount: number): boolean {`

`console.log(`Processing payment of $${amount} through Stripe.`);`
    `return true;`
  `}`

`}`

`class PayPalPaymentProcessor implements PaymentProcessor {`

`processPayment(amount: number): boolean {`

`console.log(`Processing payment of $${amount} through PayPal.`);`
    `return true;`
  `}`

`}`

`// 3-Refactor High-Level Module`
`// Now, we modify CheckoutService to depend on the PaymentProcessor`
`//  interface instead of a concrete implementation.`
`class CheckoutService {`

`private paymentProcessor: PaymentProcessor;`
  `constructor(paymentProcessor: PaymentProcessor) {`
    `// Dependency Injection`
    `this.paymentProcessor = paymentProcessor;`
  `}`

`checkout(amount: number): void {`
    `if (this.paymentProcessor.processPayment(amount)) {`
      `console.log("Checkout successful!");`
    `} else {`
      `console.log("Checkout failed.");`
    `}`
  `}`

`}`

`const paypalProcessor = new PayPalPaymentProcessor();`
`const checkoutWithPaypal = new CheckoutService(paypalProcessor);`
`checkoutWithPaypal.checkout(200);`
