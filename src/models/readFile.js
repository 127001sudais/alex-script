import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export async function readWhiteListedAddresses(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(
          `Error: Failed to read white-listed addresses from ${filePath}. Ensure the file exists and has the correct permissions. Error details: ${err.message}`
        );
      } else {
        console.log(data);
        resolve(data.split("\n").filter((line) => line.trim() !== ""));
      }
    });
  });
}

readWhiteListedAddresses(__dirname, "whitelistAddress.txt");
