import { promises as fs } from "fs";

abstract class ConfigManager {
  protected configData: Record<string, any> = {};

  async loadConfig(filePath: string): Promise<void> {
    const data = await fs.readFile(filePath, "utf8");
    this.configData = this.parse(data);
  }

  async saveConfig(filePath: string): Promise<void> {
    const data = this.stringify(this.configData);
    await fs.writeFile(filePath, data, "utf8");
  }

  get<T = any>(key: string): T | undefined {
    return this.configData[key];
  }

  set<T = any>(key: string, value: T): void {
    this.configData[key] = value;
  }

  protected abstract parse(data: string): Record<string, any>;
  protected abstract stringify(data: Record<string, any>): string;
}

export default ConfigManager;
