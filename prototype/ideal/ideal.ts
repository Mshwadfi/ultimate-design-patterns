interface MarketingData {
  layout: string;
  content: string;
  color: string;
}

abstract class MarketingMaterial {
  private layout: string;
  private content: string;
  private color: string;

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

  setLayout(layout: string) {
    this.layout = layout;
    return this;
  }
  setContent(content: string) {
    this.content = content;
    return this;
  }
  setColor(color: string) {
    this.color = color;
    return this;
  }

  public print() {
    console.log(`layout: ${this.layout}`);
    console.log(`content: ${this.content}`);
    console.log(`color: ${this.color}`);
  }

  public abstract clone(data?: Partial<MarketingData>): MarketingMaterial;
}

class Poster extends MarketingMaterial {
  constructor(layout: string, content: string, color: string) {
    super(layout, content, color);
  }

  public clone(data: Partial<MarketingData> = {}): Poster {
    return new Poster(
      data.layout ?? this.getLayout(),
      data.content ?? this.getContent(),
      data.color ?? this.getColor()
    );
  }
}

class Flyer extends MarketingMaterial {
  constructor(layout: string, content: string, color: string) {
    super(layout, content, color);
  }

  public clone(data: Partial<MarketingData> = {}): Flyer {
    return new Flyer(
      data.layout ?? this.getLayout(),
      data.content ?? this.getContent(),
      data.color ?? this.getColor()
    );
  }
}

class Brochure extends MarketingMaterial {
  constructor(layout: string, content: string, color: string) {
    super(layout, content, color);
  }

  public clone(data: Partial<MarketingData> = {}): Brochure {
    return new Brochure(
      data.layout ?? this.getLayout(),
      data.content ?? this.getContent(),
      data.color ?? this.getColor()
    );
  }
}

const originalPoster = new Poster("Portrait", "Grand Opening!", "Red");
const clonedPoster = originalPoster
  .clone()
  .setColor("Blue")
  .setContent("Summer Sale");

originalPoster.print();
clonedPoster.print();
