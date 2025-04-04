import { ContentType } from "./ContentType";

class Publisher {
  private name: string;
  private subscribers: Map<ContentType, Set<ISubscriber>>;

  constructor(
    name: string,
    contentTypes: ContentType[] = Object.values(ContentType)
  ) {
    this.name = name;
    this.subscribers = new Map<ContentType, Set<ISubscriber>>();
    contentTypes.forEach((contentType) => {
      this.subscribers.set(contentType, new Set<ISubscriber>());
    });
  }

  addSubscriber(contentType: ContentType, subscriber: ISubscriber) {
    const subscribers = this.subscribers.get(contentType);
    if (!subscribers) {
      throw new Error(`Unsupported content type: ${contentType}`);
    }
    subscribers.add(subscriber);
  }

  removeSubscriber(contentType: ContentType, subscriber: ISubscriber) {
    let subscribers = this.subscribers.get(contentType);

    if (!subscribers) {
      throw new Error(`Unsupported content type: ${contentType}`);
    }
    subscribers.delete(subscriber);
  }

  notifySubscribers(contentType: ContentType, message: string): void {
    const subscribers = this.subscribers.get(contentType);
    if (!subscribers) {
      throw new Error(`Unsupported content type: ${contentType}`);
    }
    subscribers.forEach((sub) => sub.notify(message));
  }

  publishBlogPost(content: string): void {
    console.log(`\n${this.name} published a new blog: ${content}`);
    this.notifySubscribers(ContentType.BLOG_POST, content);
  }

  publishNewsLetter(content: string): void {
    console.log(`\n${this.name} published a new NewsLetter: ${content}`);
    this.notifySubscribers(ContentType.NEWSLETTER, content);
  }
}
