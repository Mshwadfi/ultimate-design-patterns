class MarketingMaterial {
  private readonly layout: string;
  private readonly content: string;
  private readonly color: string;

  constructor(layout: string, content: string, color: string) {
    this.layout = layout;
    this.content = content;
    this.color = color;
  }

  getLayout() {
    return this.layout;
  }

  getContent() {
    return this.content;
  }

  getColor() {
    return this.color;
  }

  public print() {
    console.log(`layout: ${this.layout}`);
    console.log(`content: ${this.content}`);
    console.log(`color: ${this.color}`);
  }
}

class Poster extends MarketingMaterial {}
class Flyer extends MarketingMaterial {}
class Brochure extends MarketingMaterial {}

const poster = new Poster("Portrait", "Grand Opening!", "Red");
poster.print();
