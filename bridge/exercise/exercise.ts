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

class EgyptAir implements FlightProvider {
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
  constructor(private loyaltyProgram: LoyaltyProgram) {}

  bookFlight(basePrice: number): void {
    const discount = this.loyaltyProgram.getDiscount();
    const finalPrice = basePrice - (basePrice * discount) / 100;
    console.log(`Booking with EgyptAir. Final Price: $${finalPrice}`);
  }
}
