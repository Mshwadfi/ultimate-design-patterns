// TemperatureData.ts
export class TemperatureData {
  result: string;

  constructor(result: string) {
    this.result = result;
  }
  getData() {
    return this.result;
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
    return this.weatherApi.getTemprature(city, country);
  }
  getTempratureLocation(longitude: number, latitude: number) {
    const city = this.getCity(longitude, latitude);
    const country = this.getCountry(latitude, longitude);
    const xmlData = this.weatherApi.getTemprature(city, country);
    const convertedData = this.convertDataIntoJson(xmlData);

    return convertedData;
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
}

const api = new ThirdPartyWeatherService();
const weatherService = new LegacyWeatherService(api);

console.log(weatherService.getTemprature("cairo", "egypt"));
console.log(weatherService.getTempratureLocation(11, 111));
