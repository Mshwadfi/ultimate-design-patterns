import { ISubscriber } from "./Isubscriber";

export class JobFinder implements ISubscriber {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  notify(message: string): void {
    console.log(`JobFinder ${this.name} notified: ${message}`);
  }
}
