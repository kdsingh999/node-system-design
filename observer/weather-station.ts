class WeatherStation {
  private observers: any[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  addObserver(observer: any) {
    this.observers.push(observer);
  }
  setTemperature(temperature: number) {
    this.temperature = temperature;
    this.notifyObservers();
  }
  setHumidity(humidity: number) {
    this.humidity = humidity;
    this.notifyObservers();
  }
  setPressure(pressure: number) {
    this.pressure = pressure;
    this.notifyObservers();
  }
  notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }
}

export default WeatherStation;
