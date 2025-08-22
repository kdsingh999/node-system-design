class Receiver {
  execute(command: any) {
    console.log("Executing command");
    command.execute();
  }
}

export default new Receiver();
