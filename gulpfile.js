const fs = require("fs");
const axios = require("axios");
const instance = require("./minecraftinstance.json");

async function installMods(callback) {
  console.log("- Installing mods");
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
  callback();
}

async function updateModlist() {
  console.log("- Updating MOD_LIST.md");
  let markdownData = "## The Spawn Island | Mod List";
  const mods = instance.installedAddons
    .map((addon) => addon.installedFile.fileName)
    .sort()
    .map((mod) => "- " + mod)
    .join("\n");
  fs.writeFileSync("MOD_LIST.md", markdownData + "\n" + mods);
}

exports["install-mods"] = installMods;
exports["update-list"] = updateModlist;
