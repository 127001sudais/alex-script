import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readWhiteListedAddresses(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(
          `Error: Failed to read white-listed addresses from ${filePath}. Ensure the file exists and has the correct permissions. Error details: ${err.message}`
        );
      } else {
        // console.log(data);
        resolve(data.split("\n").filter((line) => line.trim() !== ""));
      }
    });
  });
}

export async function checkAddresAgainstWhiteListedAddress(
  address,
  amount,
  transactionSignature
) {
  try {
    const whiteListedAddress = await readWhiteListedAddresses(
      path.join(__dirname, "whitelistAddress.txt")
    );

    if (whiteListedAddress.includes(address)) {
      console.log(`Present in the whitelist`);
    } else {
      console.log(`Warning: ${address} not present in the whitelist`);
    }
  } catch (error) {
    console.error(
      `Error: Failed to check if address ${address} is whitelisted due to an error. Ensure the whitelist file exists and is formatted correctly. Error details: ${error.message}`
    );
  }
}

await checkAddresAgainstWhiteListedAddress(
  "2kNBchuVw3TFFsbDKYNKsqYkh1RateczhKpn3z4gXFPF"
);