export class Offer {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  // Getter and Setter
  get getMessage(): string {
    return this.message;
  }

  set setMessage(message: string) {
    this.message = message;
  }
}
