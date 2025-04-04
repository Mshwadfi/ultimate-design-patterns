export class User {
  private name: string;
  private isSubscribedToOffers: boolean;
  private isSubscribedToProducts: boolean;

  constructor(
    name: string,
    isSubscribedToOffers = false,
    isSubscribedToProducts = false
  ) {
    this.name = name;
    this.isSubscribedToOffers = isSubscribedToOffers;
    this.isSubscribedToProducts = isSubscribedToProducts;
  }

  // Getters and Setters
  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getIsSubscribedToOffers(): boolean {
    return this.isSubscribedToOffers;
  }

  set setIsSubscribedToOffers(status: boolean) {
    this.isSubscribedToOffers = status;
  }

  get getIsSubscribedToProducts(): boolean {
    return this.isSubscribedToProducts;
  }

  set setIsSubscribedToProducts(status: boolean) {
    this.isSubscribedToProducts = status;
  }

  // Methods
  notifyUser(message: string): void {
    console.log(`${this.name} received message: ${message}`);
  }

  subscribe(): void {
    console.log(`${this.name} subscribed.`);
  }
}
