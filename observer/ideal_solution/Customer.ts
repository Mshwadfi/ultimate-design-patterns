import { ISubscriber } from "./Isubscriber";

export class Customer implements ISubscriber {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  notify(message: string): void {
    console.log(`${this.name} recieved notification: ${message}`);
  }
}
