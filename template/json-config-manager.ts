import ConfigManager from "./config-manager";

class JsonConfigManager extends ConfigManager {
  parse(data: string) {
    return JSON.parse(data);
  }
  stringify(data: any) {
    return JSON.stringify(data);
  }
}

export default JsonConfigManager;
