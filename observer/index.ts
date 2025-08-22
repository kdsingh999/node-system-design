import Web from "./web";
import Phone from "./phone";
import WeatherStation from "./weather-station";

const webDisplay = new Web();
const phoneDisplay = new Phone();
const weatherStation = new WeatherStation();
weatherStation.addObserver(webDisplay);
weatherStation.addObserver(phoneDisplay);
weatherStation.setTemperature(70);
weatherStation.setHumidity(65);
weatherStation.setPressure(29.65);
