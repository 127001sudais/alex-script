import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { freezeNonWhiteListedAccount } from "../utils/freezeAccount.js";
import { fetchOwnerOfTokenAccount } from "../clients/fetchAccountInfo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function readWhiteListedAddresses(filePath) {
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
  transactionSignature,
  transactionDate
) {
  const ownerAddress = await fetchOwnerOfTokenAccount(address);
  try {
    const whiteListedAddress = await readWhiteListedAddresses(
      path.join(__dirname, "whiteListAddress.txt")
    );
    if (whiteListedAddress.includes(ownerAddress)) {
      console.log(
        chalk.blue(`[Info] ${ownerAddress} Present in the whitelist`)
      );
    } else {
      await freezeNonWhiteListedAccount(address, amount, transactionDate);
      // console.log(
      //   `${chalk.bgMagenta("[DEBUG]")} Address ${chalk.cyan(
      //     ownerAddress
      //   )} is not whitelisted.`
      // );
    }
  } catch (error) {
    console.error(
      `Error: Failed to check if address ${chalk.blue(
        ownerAddress
      )} is whitelisted due to an error. Ensure the whitelist file exists and is formatted correctly.`
    );
  }
}
