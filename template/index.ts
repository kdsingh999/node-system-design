import JsonConfigManager from "./json-config-manager";

async function main() {
  const jsonConfig = new JsonConfigManager();
  await jsonConfig.loadConfig("config.json");
  jsonConfig.set("application", "configStuff");
  await jsonConfig.saveConfig("config_modified.json");
  console.log(jsonConfig.get("application"));
}

main().catch((err: any) => console.error(err));
