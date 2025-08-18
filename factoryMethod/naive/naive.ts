//payment processor class
class PaymentProcessor {
  processPayment(
    cardTYpe: string,
    cardHolder: string,
    cardNumber: string,
    cvv: string,
    expiryDate: string
  ) {
    let paymentMethod: PaymentMethod;
    if (cardTYpe === "visa")
      paymentMethod = new Visa(cardHolder, cardNumber, cvv, expiryDate);
    else if (cardTYpe === "masterCard")
      paymentMethod = new MasterCard(cardHolder, cardNumber, cvv, expiryDate);
    else throw new Error(`card type: ${cardTYpe} is not supported`);

    paymentMethod.authorizePayment();
    paymentMethod.startMoneyTransfer();
    paymentMethod.calculatePaymentFees();
  }
}

abstract class PaymentMethod {
  private cardHolder: string;
  private cardNumber: string;
  private cvv: string;
  private expiryDate: string;

  constructor(
    cardHolder: string,
    cardNumber: string,
    cvv: string,
    expiryDate: string
  ) {
    this.cardHolder = cardHolder;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }

  public abstract authorizePayment(): void;
  public abstract startMoneyTransfer(): void;
  public abstract calculatePaymentFees(): void;

  public getCardHolder(): string {
    return this.cardHolder;
  }

  public setCardHolder(value: string): void {
    this.cardHolder = value;
  }

  public getCardNumber(): string {
    return this.cardNumber;
  }

  public setCardNumber(value: string): void {
    this.cardNumber = value;
  }

  public getCvv(): string {
    return this.cvv;
  }

  public setCvv(value: string): void {
    this.cvv = value;
  }

  public getExpiryDate(): string {
    return this.expiryDate;
  }

  public setExpiryDate(value: string): void {
    this.expiryDate = value;
  }
}

class Visa extends PaymentMethod {
  constructor(
    cardHolder: string,
    cardNumber: string,
    cvv: string,
    expiryDate: string
  ) {
    super(cardHolder, cardNumber, cvv, expiryDate);
  }
  public authorizePayment(): void {
    console.log("authorizing the visa card holder...");
  }
  public startMoneyTransfer(): void {
    console.log("start transfering money using visa ...");
  }
  public calculatePaymentFees(): void {
    console.log("calculate Payment fees for visa ...");
  }
}

class MasterCard extends PaymentMethod {
  constructor(
    cardHolder: string,
    cardNumber: string,
    cvv: string,
    expiryDate: string
  ) {
    super(cardHolder, cardNumber, cvv, expiryDate);
  }
  public authorizePayment(): void {
    console.log("authorizing the master card holder...");
  }
  public startMoneyTransfer(): void {
    console.log("start transfering money using master card ...");
  }
  public calculatePaymentFees(): void {
    console.log("calculate Payment fees for master card ...");
  }
}

const paymentProcessor = new PaymentProcessor().processPayment(
  "visa",
  "ali",
  "12334",
  "333",
  "12/2029"
);
