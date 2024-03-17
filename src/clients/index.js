import chalk from "chalk";
import { PublicKey } from "@solana/web3.js";
import { fetchParsedTransactions } from "./fetchParsedTransactions.js";
import { fetchSignaturesForAddress } from "./fetchSignaturesForAddress.js";
import { SubscribeToAccount, accountUpdateEmitter } from "./webSocketClient.js";
import { checkAddresAgainstWhiteListedAddress } from "../models/whiteListChecker.js";
import { TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";

/**
Legacy Code
let updateCounter = 0;

export async function monitorAccountUpdates() {
  try {
    await SubscribeToAccount();
  } catch (error) {
    console.error(
      chalk.red(
        "Failed to subscribe to account updates. Monitoring will not proceed."
      )
    );
    return;
  }

  accountUpdateEmitter.on("update", async () => {
    updateCounter++;
    console.log(chalk.magentaBright("=".repeat(100)));
    console.log(chalk.blue(`[INFO] Account update detected.`));

    if (updateCounter % 10 === 0) {
      const accountPublicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);
      try {
        const signatures = await fetchSignaturesForAddress(
          accountPublicKey,
          10
        );
        if (signatures && signatures.length > 0) {
          const transactions = await fetchParsedTransactions(signatures);
          for (const transaction of transactions) {
            console.log(`[Transaction Sender] `, transaction.sender);
            await checkAddresAgainstWhiteListedAddress(
              transaction.receiver,
              transaction.amount,
              transaction.transactionSignature
            );
            await checkAddresAgainstWhiteListedAddress(
              transaction.sender,
              transaction.amount,
              transaction.transactionSignature
            );
          }
          console.log(
            chalk.green(`[Success] Transactions processed successfully.`)
          );
        } else {
          console.log(
            chalk.yellow(`[Warning] No signatures found for the account.`)
          );
        }
      } catch (error) {
        console.error(
          chalk.red(`Error during account update processing: ${error.message}`)
        );
      }
      updateCounter = 0;
    } else {
      console.log(
        chalk.yellow(
          `[INFO] ${updateCounter} update received. Waiting for 10th update to process.`
        )
      );
    }
  });
}
*/

let updateCounter = 0;
let processingTimer = null;

export async function monitorAccountUpdates() {
  try {
    await SubscribeToAccount();
  } catch (error) {
    console.error(
      chalk.red(
        "Failed to subscribe to account updates. Monitoring will not proceed."
      )
    );
    return;
  }

  accountUpdateEmitter.on("update", async () => {
    updateCounter++;
    if (updateCounter === 1) {
      // Starting the timer on the first update.
      processingTimer = setTimeout(() => {
        console.log(
          chalk.yellow(
            `[Timer] 10 seconds passed, processing ${updateCounter} updates.`
          )
        );
        processUpdates(); // Processing the updates after 10 seconds if the counter hasn't reached 10.
      }, 10000); // 10 seconds
    }
    console.log(
      chalk.blue(
        `[INFO] Account update detected. Current count: ${updateCounter}`
      )
    );

    if (updateCounter >= 10) {
      console.log(chalk.green(`[Counter] Reached 10 updates, processing now.`));
      clearTimeout(processingTimer); // Clearing the timer when processing the updates.
      processUpdates();
    }
  });
}

async function processUpdates() {
  const accountPublicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);
  try {
    console.log(chalk.magentaBright("=".repeat(100)));
    const signatures = await fetchSignaturesForAddress(
      accountPublicKey,
      updateCounter
    );
    if (signatures && signatures.length > 0) {
      const transactions = await fetchParsedTransactions(signatures);
      for (const transaction of transactions) {
        console.log(`[Transaction Sender] `, transaction.sender);
        await checkAddresAgainstWhiteListedAddress(
          transaction.receiver,
          transaction.amount,
          transaction.transactionSignature
        );
        await checkAddresAgainstWhiteListedAddress(
          transaction.sender,
          transaction.amount,
          transaction.transactionSignature
        );
      }
      console.log(
        chalk.green(`[Success] Transactions processed successfully.`)
      );
    } else {
      console.log(
        chalk.yellow(`[Warning] No signatures found for the account.`)
      );
    }
  } catch (error) {
    console.error(
      chalk.red(`Error during account update processing: ${error.message}`)
    );
  }
  // Reset the counter and timer for the next batch of updates.
  updateCounter = 0;
  clearTimeout(processingTimer);
  processingTimer = null;
}
