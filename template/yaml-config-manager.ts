import ConfigManager from "./config-manager";
import yaml from "js-yaml";

class YamlConfigManager extends ConfigManager {
  protected stringify(data: Record<string, any>): string {
    return yaml.dump(data);
  }

  protected parse(data: string): Record<string, any> {
    return yaml.load(data) as Record<string, any>;
  }
}

export default YamlConfigManager;
