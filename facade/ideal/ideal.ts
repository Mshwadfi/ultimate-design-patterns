class Trip {
  constructor(
    public departure: string,
    public destination: string,
    public flightDate: string,
    public roomId: string,
    public checkInDate: string,
    public checkOutDate: string,
    public carRentalLocation: string,
    public carRentalStartDate: string,
    public carRentalEndDate: string,
    public amount: number,
    public paymentMethod: string
  ) {}
}

class FlightBookingManager {
  constructor(private date: string, private from: string, private to: string) {}

  bookFlight() {
    console.log(
      `Flight booked from ${this.from} to ${this.to} on ${this.date}`
    );
  }
}

class HotelReservationManager {
  constructor(
    private roomId: string,
    private checkIn: string,
    private checkOut: string
  ) {}

  reserveRoom() {
    console.log(
      `Room ${this.roomId} reserved from ${this.checkIn} to ${this.checkOut}`
    );
  }
}

class CarRentalManager {
  constructor(
    private location: string,
    private start: string,
    private end: string
  ) {}

  rentCar() {
    console.log(
      `Car rented in ${this.location} from ${this.start} to ${this.end}`
    );
  }
}

class PaymentProcessor {
  constructor(private amount: number, private method: string) {}

  processPayment() {
    console.log(`Paid $${this.amount} via ${this.method}`);
  }
}

class TravelFacade {
  constructor(private trip: Trip) {}

  bookCompleteTrip() {
    console.log("Starting complete trip booking...\n");

    const flight = new FlightBookingManager(
      this.trip.flightDate,
      this.trip.departure,
      this.trip.destination
    );
    flight.bookFlight();

    const hotel = new HotelReservationManager(
      this.trip.roomId,
      this.trip.checkInDate,
      this.trip.checkOutDate
    );
    hotel.reserveRoom();

    const car = new CarRentalManager(
      this.trip.carRentalLocation,
      this.trip.carRentalStartDate,
      this.trip.carRentalEndDate
    );
    car.rentCar();

    const payment = new PaymentProcessor(
      this.trip.amount,
      this.trip.paymentMethod
    );
    payment.processPayment();

    console.log("Trip successfully booked!\n");
  }
}

// usage

const trip = new Trip(
  "Cairo",
  "Dubai",
  "2025-07-01",
  "RM101",
  "2025-07-01",
  "2025-07-10",
  "Dubai Airport",
  "2025-07-01",
  "2025-07-10",
  2450.75,
  "Visa"
);

const travelFacade = new TravelFacade(trip);
travelFacade.bookCompleteTrip();
