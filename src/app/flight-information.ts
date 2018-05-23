export class FlightInformation {
  flightNumber: number;
  carrier: string;
  origin: string;
  departure: Date;
  destination: string;
  arrival: Date;
  aircraft: string;
  distance: number;
  constructor(config?) {
    config = config || {};
    this.flightNumber = config.flightNumber;
    this.carrier = this.carrier;
    this.origin = this.origin;
    this.departure = config.departure;
    this.destination = config.destination;
    this.arrival = config.arrival;
    this.aircraft = config.aircraft;
    this.distance = config.distance;
  }
}
