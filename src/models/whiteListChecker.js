import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { freezeNonWhiteListedAccount } from "../utils/freezeAccount.js";
import { fetchOwnerOfTokenAccount } from "../clients/fetchAccountInfo.js";
import { fetchBalance } from "../clients/fetchBalance.js";
import { PublicKey } from "@solana/web3.js";
import {
  DELAY_FREEZE_TIME_IN_MINUTES,
  MINIMUM_SOL_BALANCE,
} from "../constants/constatnt.js";

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
  const amount_of_SOL = await fetchBalance(new PublicKey(ownerAddress));

  try {
    const whiteListedAddress = await readWhiteListedAddresses(
      path.join(__dirname, "whiteListAddress.txt")
    );
    if (whiteListedAddress.includes(ownerAddress)) {
      console.log(
        `${chalk.blue(`[Info] Account`)}  ${chalk.yellow(
          ownerAddress
        )} ${chalk.blue(
          `is present in the whitelist with`
        )} ${chalk.greenBright(amount_of_SOL)} ${chalk.blue(`SOL`)}`
      );
    } else {
      if (amount_of_SOL < MINIMUM_SOL_BALANCE) {
        console.log(
          `Balance is below ${chalk.green(
            MINIMUM_SOL_BALANCE
          )} SOL, delaying the freeze action by ${chalk.blue(
            (DELAY_FREEZE_TIME_IN_MINUTES * 60000) / 60000
          )} mintutes for account ${chalk.yellow(ownerAddress)}`
        );
        setTimeout(() => {
          freezeNonWhiteListedAccount(
            address,
            amount,
            transactionDate,
            amount_of_SOL,
            ownerAddress
          );
        }, DELAY_FREEZE_TIME_IN_MINUTES * 60000);
      } else {
        await freezeNonWhiteListedAccount(
          address,
          amount,
          transactionDate,
          amount_of_SOL,
          ownerAddress
        );
      }
    }
  } catch (error) {
    console.error(
      `Error: Failed to check if address ${chalk.blue(
        ownerAddress
      )} is whitelisted due to an error. Ensure the whitelist file exists and is formatted correctly.`
    );
  }
}
