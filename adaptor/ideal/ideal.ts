class TemperatureData {
  result: string;

  constructor(result: string) {
    this.result = result;
  }
  getData() {
    return this.result;
  }
}

interface WeatherServiceAdaptor {
  getTemprature(longitude: number, latitude: number): TemperatureData;
}

class WeatherServiceAdaptee implements WeatherServiceAdaptor {
  private legacyWeatherServise: LegacyWeatherService;
  constructor(legacyWeatherService: LegacyWeatherService) {
    this.legacyWeatherServise = legacyWeatherService;
  }
  getCity(longitude: number, latitude: number) {
    return "city";
  }
  getCountry(longitude: number, latitude: number) {
    return "country";
  }
  private convertDataIntoJson(weatherData: string): TemperatureData {
    console.log(`Converting raw XML weather data to JSON`);
    return new TemperatureData("Converted temperature data");
  }
  getTemprature(longitude: number, latitude: number): TemperatureData {
    const city = this.getCity(longitude, latitude);
    const country = this.getCountry(latitude, longitude);
    const xmlData = this.legacyWeatherServise.getTemprature(city, country);

    return this.convertDataIntoJson(xmlData);
  }
}

class ThirdPartyWeatherService {
  getTemprature(city: string, country: string) {
    console.log(`getting weather at city: ${city} in country: ${country}`);

    return "weather in XML format";
  }
}

class LegacyWeatherService {
  private weatherApi: ThirdPartyWeatherService;
  constructor(weatherApi: ThirdPartyWeatherService) {
    this.weatherApi = weatherApi;
  }

  getTemprature(city: string, country: string) {
    console.log(`getting weather at city: ${city} in country: ${country}`);

    return "weather in XML format";
  }
}

const api = new ThirdPartyWeatherService();
const legacyService = new LegacyWeatherService(api);

const adaptor = new WeatherServiceAdaptee(legacyService);

console.log(adaptor.getTemprature(11, 1111));
console.log(legacyService.getTemprature("cairo", "egypt"));
