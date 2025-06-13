class FlightBookingManager {
  private startDate: string;
  private endDate: string;

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  bookFlight() {
    console.log(`🛫 Flight booked from Cairo to Dubai`);
    console.log(`📅 Departure: ${this.startDate} | Return: ${this.endDate}`);
    console.log("✅ Flight booking confirmed.");
  }
}

class HotelReservationManager {
  private startDate: string;
  private endDate: string;

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  reserveRoom() {
    console.log(`Room reserved at Atlantis The Palm, Dubai`);
    console.log(`Check-in: ${this.startDate} | Check-out: ${this.endDate}`);
    console.log("Hotel reservation confirmed.");
  }
}

class CarRentalManager {
  private startDate: string;
  private endDate: string;

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  rentCar() {
    console.log(`Car rented: Toyota Corolla`);
    console.log(`Rental period: ${this.startDate} to ${this.endDate}`);
    console.log("Car rental confirmed.");
  }
}

class PaymentProcessor {
  private amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  processPayment() {
    console.log(`Processing payment of $${this.amount.toFixed(2)}...`);
    console.log("Payment successful.");
  }
}

const startDate = "2025-07-01";
const endDate = "2025-07-10";

const flight = new FlightBookingManager(startDate, endDate);
flight.bookFlight();

const hotel = new HotelReservationManager(startDate, endDate);
hotel.reserveRoom();

const car = new CarRentalManager(startDate, endDate);
car.rentCar();

const payment = new PaymentProcessor(2450.75);
payment.processPayment();
