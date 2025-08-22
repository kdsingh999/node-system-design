class Web {
  update(temperature: number, humidity: number, pressure: number): void {
    console.log(
      `Web==========>Current conditions: ${temperature} F degrees and ${humidity}% humidity`
    );
  }
}

export default Web;
