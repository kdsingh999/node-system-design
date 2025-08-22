class Phone {
  update(temperature: number, humidity: number, pressure: number): void {
    console.log(
      `Phone:=====>Current conditions: ${temperature} F degrees and ${humidity}% humidity`
    );
  }
}

export default Phone;
