import fs from "fs";
import axios from "axios";
import instance from "./minecraftinstance.json";

async function downloadMods() {
  for (let addon of instance.installedAddons) {
    const addonId = addon.addonID;
    const fileName = addon.installedFile.fileName;

    console.log(`[i] Downloading Mod (ID:${addonId} - ${fileName})`);

    const response = await axios.get(addon.installedFile.downloadUrl, {
      responseType: "arraybuffer",
    });

    const modsPath = "./mods";
    const path = `${modsPath}/${fileName}`;
    if (!fs.existsSync(path)) fs.mkdirSync(modsPath, { recursive: true });
    fs.writeFileSync(path, response.data);
  }
}

async function updateModlist() {
  let markdownData = "## The Spawn Island | Mod List";
  const mods = instance.installedAddons
    .map((addon) => addon.installedFile.fileName)
    .sort()
    .map((mod) => "- " + mod)
    .join("\n");
  fs.writeFileSync("MOD_LIST.md", markdownData + "\n" + mods);
}

if (process.argv[2] === "install") {
  console.log("install - install mods under mods file");
  console.log("update-list - update MOD_LIST.md");
} else if (process.argv[2] === "install") {
  console.log("- Installing mods");
  downloadMods();
} else if (process.argv[2] === "update-list") {
  console.log("- Updaling mod list");
  updateModlist();
}
