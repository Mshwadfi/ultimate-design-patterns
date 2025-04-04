import { Offer } from "./Offer";
import { Product } from "./Product";
import { User } from "./User";

export class MarketPlace {
  private name: string;
  private users: User[];
  private offers: Offer[];
  private products: Product[];

  constructor(name: string) {
    this.name = name;
    this.users = [];
    this.offers = [];
    this.products = [];
  }

  // Getters and Setters
  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getUsers(): User[] {
    return this.users;
  }

  get getOffers(): Offer[] {
    return this.offers;
  }

  get getProducts(): Product[] {
    return this.products;
  }

  // Methods to add entities
  addUser(user: User): void {
    this.users.push(user);
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.notifyUsersAboutProduct(product);
  }

  addOffer(offer: Offer): void {
    this.offers.push(offer);
    this.notifyUsersAboutOffer(offer);
  }
  notifyUsersAboutProduct(product: Product) {
    this.users.map((user) => {
      if (!user.getIsSubscribedToProducts) return;
      user.notifyUser(`a new product added: (${product.getName})`);
    });
  }
  notifyUsersAboutOffer(offer: Offer) {
    this.users.map((user) => {
      if (!user.getIsSubscribedToOffers) return;
      user.notifyUser(`a new Offer: (${offer.getMessage})`);
    });
  }
}

const milk = new Product("milk", 100);
const ali = new User("ALi");
const eidSale = new Offer("Happy Eid");
const triv = new MarketPlace("triv");
console.log("hello");
triv.addUser(ali);
ali.setIsSubscribedToOffers = true;
ali.setIsSubscribedToProducts = true;
triv.addProduct(milk);
triv.addOffer(eidSale);
