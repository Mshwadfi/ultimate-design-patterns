interface LoyalityType {
  getDiscount(): number;
}

class BasicLoyality implements LoyalityType {
  getDiscount(): number {
    return 0.2;
  }
}

class PremiumLoyality implements LoyalityType {
  getDiscount(): number {
    return 0.35;
  }
}

interface FlightProvider {
  bookFlight(basePrice: number): void;
}

class TurkishAirlines implements FlightProvider {
  private loyalityType: LoyalityType;
  constructor(loyalityType: LoyalityType) {
    this.loyalityType = loyalityType;
  }
  bookFlight(basePrice: number): void {
    const discount = this.loyalityType.getDiscount();
    const finalPrice = basePrice - basePrice * discount;

    console.log(`Booking with Turkish Airlines. Final Price: $${finalPrice}`);
  }
}

class EgyptAir implements FlightProvider {
  constructor(private loyalityType: LoyalityType) {}

  bookFlight(basePrice: number): void {
    const discount = this.loyalityType.getDiscount();
    const finalPrice = basePrice - (basePrice * discount) / 100;
    console.log(`Booking with EgyptAir. Final Price: $${finalPrice}`);
  }
}

const premiumProgram = new PremiumLoyality();
const basicProgram = new BasicLoyality();

const turkishWithPremium = new TurkishAirlines(premiumProgram);
const egyptAirWithBasic = new EgyptAir(basicProgram);

turkishWithPremium.bookFlight(500);
egyptAirWithBasic.bookFlight(400);
