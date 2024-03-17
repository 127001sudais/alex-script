import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//
import { freezeNonWhiteListedAccount } from "../utils/freezeAccount.js";

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
      path.join(__dirname, "list.txt")
    );

    if (whiteListedAddress.includes(address)) {
      console.log(chalk.blue(`Present in the whitelist`));
    } else {
      await freezeNonWhiteListedAccount(address, amount, transactionSignature);
      console.log(`Address ${chalk.cyan(address)} is not whitelisted.`);
    }
  } catch (error) {
    console.error(
      `Error: Failed to check if address ${address} is whitelisted due to an error. Ensure the whitelist file exists and is formatted correctly. Error details: ${error}`
    );
  }
}

// checkAddresAgainstWhiteListedAddress("hello", path.join(__dirname, "list.txt"));`
