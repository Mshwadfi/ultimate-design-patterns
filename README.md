# Ultimate Design Patterns

## **SOLID Principles**

### 1. Single Responsibility Principle (SRP)

The **Single Responsibility Principle** states that a class should have only one reason to change, meaning it should have only one responsibility. A class should focus on doing one thing well.

#### ❌ **Violation**

Here, the `Order` class violates SRP because it handles both payments and notifications. Any changes to notifications (e.g., switching from email to SMS) require modifying the `Order` class, which should only manage orders.

```typescript
class Order {
  private orderId: number;
  private amount: number;

  constructor(orderId: number, amount: number) {
    this.orderId = orderId;
    this.amount = amount;
  }

  processPayment(paymentMethod: string): void {
    console.log(`Processing payment of $${this.amount} using ${paymentMethod}`);
  }

  sendNotification(): void {
    console.log(`Sending notification for order ${this.orderId}`);
  }
}

const order = new Order(1, 50);
order.processPayment("PayPal");
order.sendNotification();
```

#### ✅ **Applying SRP**

Separate classes for each responsibility (Order, Payment, Notification):

```typescript
class Order {
  private orderId: number;
  private amount: number;

  constructor(orderId: number, amount: number) {
    this.orderId = orderId;
    this.amount = amount;
  }

  getOrderId(): number {
    return this.orderId;
  }

  getAmount(): number {
    return this.amount;
  }
}

class PaymentService {
  processPayment(order: Order, paymentMethod: string): void {
    console.log(
      `Processing payment of $${order.getAmount()} for Order ID ${order.getOrderId()} using ${paymentMethod}`
    );
  }
}

class NotificationService {
  sendNotification(order: Order): void {
    console.log(`Sending notification for Order ID ${order.getOrderId()}`);
  }
}

const order1 = new Order(1, 50);
const paymentService = new PaymentService();
const notificationService = new NotificationService();

paymentService.processPayment(order1, "InstaPay");
notificationService.sendNotification(order1);
```

---

### 2. Open-Closed Principle (OCP)

The **Open-Closed Principle** states that a class should be open for extension but closed for modification. This means we can add new functionality without modifying existing code.

"في حالة شرائك تيشيرت جديد انت محتاج تضعه ف الدولاب بدون ما تعيد ترتيب الدولاب"

#### EX

we want to design a class that process payment for our orders and we have various types of payment methods

#### ❌ **Violation**

A class using multiple `if-else` or `switch` statements to handle different payment methods:
if we want to add a new payment method, we need to modify the code and add another else if block

```typescript
class ProcessPayment {
  process(paymentMethod: string) {
    if (paymentMethod === "Visa") {
      console.log("Processing payment using Visa.");
    } else if (paymentMethod === "MasterCard") {
      console.log("Processing payment using MasterCard.");
    } else if (paymentMethod === "InstaPay") {
      console.log("Processing payment using InstaPay.");
    } else {
      console.log("Invalid payment method.");
    }
  }
}
```

Adding a new payment method requires modifying this class, violating OCP.

#### ✅ **Applying OCP**

create an interface that has processPayment methode, for each payment methode create a class that implements the interface and our class will only have to implement this payment method

```typescript
interface PaymentMethod {
  processPayment(): void;
}

class VisaPayment implements PaymentMethod {
  processPayment(): void {
    console.log("Processing payment using Visa.");
  }
}

class MasterCardPayment implements PaymentMethod {
  processPayment(): void {
    console.log("Processing payment using MasterCard.");
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

const paymentMethod = new ProcessPayment(new VisaPayment());
paymentMethod.processPayment();
```

---

### 3. Liskov Substitution Principle (LSP)

A subclass should be able to replace its parent class without breaking the application.

#### ex:

we have class employee and subclasses for hourly and full time employees, each type of employees has a different logic for salary calculation

#### ❌ **Violation**

create a calculateSalary method in the employee class and override it in subclasses,
Employee- if i call the calc salary
at both they will return different values.
If we override `calculateSalary()` in subclasses, they will return different values despite being of the same `Employee` type:

```typescript
class Employee {
  protected name: string;
  protected workHours: number;

  constructor(name: string, workHours: number) {
    this.name = name;
    this.workHours = workHours;
  }

  calculateSalary() {
    return this.workHours * 10;
  }
}
class PartTimeEmployee extends Employee{
    calculateSalary(){
       return this.workHours * 20;
    }
}

class FullTimeEmployee extends Employee{
    calculateSalary(){
        return this.workHours * 15;
    }
```

#### ✅ **Applying LSP**

since each employee has its own method to calc salary, them put this
method to interface and each one could implement it in its own.

```typescript
interface SalaryCalculator {
  calcSalary(): number;
}

class Employee {
  protected name: string;
  protected workHours: number;
  constructor(name, workHours) {
    this.name = name;
    this.workHours = workHours;
  }
}

class PartTimeEmployee implements SalaryCalculator {
  constructor(private workHours: number) {}

  calcSalary(): number {
    return this.workHours * 30;
  }
}

class FullTimeEmployee implements SalaryCalculator {
  constructor(private workHours: number) {}

  calcSalary(): number {
    return this.workHours * 20;
  }
}
```

---

### 4. Interface Segregation Principle (ISP)

A class should not be forced to implement methods it does not need.

#### ❌ **Violation**

In this example, both Car and Plane classes implement the IVehicle interface. However,
each class is forced to implement methods that are irrelevant to its functionality.

```
interface IVehicle {
    drive(): void;
    fly(): void;
}

class Car implements IVehicle {

drive(): void {`
        console.log('Car is driving');
}

fly(): void {
        throw new Error('Cars cannot fly');
    }
}

class Plane implements IVehicle {

drive(): void {
        throw new Error('Planes cannot drive');
}

fly(): void {
        console.log('Plane is flying');
    }
}
```

#### ✅ **Applying ISP**

Create separate interfaces for specific functionality:

```typescript
interface ICar {
  drive(): void;
}

interface IPlane {
  fly(): void;
}

class Car implements ICar {
  drive(): void {
    console.log("Car is driving");
  }
}

class Plane implements IPlane {
  fly(): void {
    console.log("Plane is flying");
  }
}
```

---

### 5. Dependency Inversion Principle (DIP)

high-level modules should not depend directly on low-level modules; instead, both should rely on abstractions, such as interfaces or abstract classes.

#### EX:

checkout in ecommerce apps

#### ❌ **Violation**

Imagine we have a simple e-commerce application where a Checkout Service directly depends on a specific payment processor, such as Stripe Payment Processor. This creates tight coupling between the high-level module (Checkout Service) and the low-level module (Stripe Payment Processor).

A `CheckoutService` depends directly on `StripePaymentProcessor`:

```typescript
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

const checkoutService = new CheckoutService();
checkoutService.checkout(100);
```

Issues with This Approach
Tight Coupling: CheckoutService is tightly coupled to StripePaymentProcessor. If we want to switch to another payment processor (e.g., PayPal), we need to modify CheckoutService. Difficult Testing: Testing CheckoutService in isolation becomes challenging since it directly instantiates StripePaymentProcessor. Limited Flexibility: Adding new payment processors requires changes in multiple places in the codebase.

#### ✅ **Applying DIP**

Use an interface to abstract the payment processor:

```typescript
// 1- Define an Interface
interface PaymentProcessor {
  processPayment(amount: number): boolean;
}

// 2- Implement low-level modules
class StripePaymentProcessor implements PaymentProcessor {
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

// 3- Refactor High-Level Module
// Now, we modify CheckoutService to depend on the PaymentProcessor
// interface instead of a concrete implementation.
class CheckoutService {
  private paymentProcessor: PaymentProcessor;

  constructor(paymentProcessor: PaymentProcessor) {
    // Dependency Injection
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
const checkoutWithPaypal = new CheckoutService(paypalProcessor);
checkoutWithPaypal.checkout(200);
```
