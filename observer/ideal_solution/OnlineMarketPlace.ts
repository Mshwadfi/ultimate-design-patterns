import { Customer } from "./Customer";
import { Offer } from "./Offer";
import { Product } from "./Product";
import { EventType } from "./EventTypes";
import { ISubscriber } from "./Isubscriber";
class OnlineMarketPlace {
  private subscribers: Map<EventType, ISubscriber[]>;
  private products: Product[];
  private offers: Offer[];

  constructor() {
    this.subscribers = new Map<EventType, ISubscriber[]>();
    this.products = [];
    this.offers = [];

    //for each event typeinitialise empty array
    Object.values(EventType).forEach((eventType) => {
      this.subscribers.set(eventType as EventType, []);
    });
  }

  subscribe(eventType: EventType, subscriber: ISubscriber) {
    const subscribers = this.subscribers.get(eventType) || [];
    if (!subscribers.includes(subscriber)) {
      subscribers.push(subscriber);
      this.subscribers.set(eventType, subscribers);
    }
  }

  unsubscribe(eventType: EventType, subscriber: ISubscriber): void {
    const subscribers = this.subscribers.get(eventType);
    if (subscribers) {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    }
  }

  private notifySubscribers(eventType: EventType, message: string) {
    const subscribers = this.subscribers.get(eventType);
    subscribers?.forEach((subscriber) => {
      subscriber.notify(message);
    });
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.notifySubscribers(
      EventType.NEW_PRODUCT,
      `New product added: ${product.getName()}`
    );
  }

  addOffer(offer: Offer): void {
    this.offers.push(offer);
    this.notifySubscribers(
      EventType.NEW_OFFER,
      `New offer available: ${offer.getMessage()}`
    );
  }

  addOpenPosition(jobTitle: string): void {
    this.notifySubscribers(
      EventType.OPEN_POSITION,
      `New job position open: ${jobTitle}`
    );
  }
  getProducts(): Product[] {
    return [...this.products];
  }

  getOffers(): Offer[] {
    return [...this.offers];
  }
}

const AboOmar = new OnlineMarketPlace();

const ali = new Customer("ali");
const ahmed = new Customer("ahmed");
const muhammad = new Customer("muhammad");

AboOmar.subscribe(EventType.NEW_PRODUCT, ali);
AboOmar.subscribe(EventType.NEW_OFFER, ali);
AboOmar.subscribe(EventType.NEW_PRODUCT, ahmed);
AboOmar.subscribe(EventType.NEW_PRODUCT, muhammad);
AboOmar.subscribe(EventType.OPEN_POSITION, muhammad);
AboOmar.subscribe(EventType.NEW_OFFER, ahmed);

const milk = new Product("milk", 3.99);
const meat = new Product("meat", 299.99);

const eidMubarak = new Offer("Happy Eid, 15% off");
AboOmar.addOffer(eidMubarak);
AboOmar.addOpenPosition("Software Developer");
AboOmar.unsubscribe(EventType.NEW_OFFER, ali);
