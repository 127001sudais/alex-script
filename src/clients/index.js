import chalk from "chalk";
import { PublicKey } from "@solana/web3.js";
import { fetchParsedTransactions } from "./fetchParsedTransactions.js";
import { fetchSignaturesForAddress } from "./fetchSignaturesForAddress.js";
import { SubscribeToAccount, accountUpdateEmitter } from "./webSocketClient.js";
import { checkAddresAgainstWhiteListedAddress } from "../models/whiteListChecker.js";
import { TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";

/**
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
      console.log(chalk.magentaBright("=".repeat(100)));
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
 */

const accountPublicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);

// Initialize counters and timers
let updateCounter = 0;
let processingTimer = null;

/**
 * Monitors account updates by subscribing to account changes.
 * When updates are detected, it either starts a timer or processes the updates immediately
 * depending on the update count.
 */
export async function monitorAccountUpdates() {
  try {
    await SubscribeToAccount();
  } catch (error) {
    console.error(
      chalk.red(
        "[Error] Failed to subscribe to account updates. Monitoring will not proceed."
      )
    );
    return;
  }

  accountUpdateEmitter.on("update", handleAccountUpdate);
}

/**
 * Handles an account update. Increments the update counter and decides whether to start
 * a processing timer or to process updates immediately based on the update count.
 */
async function handleAccountUpdate() {
  updateCounter++;
  console.log(
    chalk.blue(
      `[INFO] Account update detected. Current count: ${updateCounter}`
    )
  );

  if (updateCounter === 1) {
    startProcessingTimer();
  }

  // if (updateCounter >= 10) {
  //   console.log(chalk.green(`[Counter] Reached 10 updates, processing now.`));
  //   clearTimeout(processingTimer);
  //   await processUpdates();
  // }
}

/**
 * Starts a timer that triggers processing of account updates after a specified delay.
 */
function startProcessingTimer() {
  processingTimer = setTimeout(async () => {
    console.log(
      chalk.yellow(
        `[Timer] 10 seconds passed, processing ${updateCounter} updates.`
      )
    );
    await processUpdates();
  }, 10000); // 10 seconds
}

/**
 * Processes account updates by fetching and processing transactions associated with the account.
 */
async function processUpdates() {
  try {
    const signatures = await fetchSignaturesForAddress(
      accountPublicKey,
      updateCounter
    );

    if (signatures.length > 0) {
      const transactions = await fetchParsedTransactions(signatures);
      for (const transaction of transactions) {
        if (
          transaction &&
          transaction.receiver &&
          transaction.sender &&
          transaction.amount &&
          transaction.transactionSignature
        ) {
          await processTransaction(transaction);
        } else {
          console.log(
            chalk.yellow(`[Warning] Invalid transaction object encountered.`)
          );
        }
      }
      console.log(
        chalk.green(`[Success] Transactions processed successfully.`)
      );
      console.log(chalk.magentaBright("=".repeat(100)));
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
  resetProcessingState();
}

/**
 * Processes a single transaction by checking both the sender and receiver against a whitelist.
 * @param {Object} transaction The transaction to process.
 */
async function processTransaction(transaction) {
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

/**
 * Resets the update counter and processing timer to prepare for the next batch of updates.
 */
function resetProcessingState() {
  updateCounter = 0;
  clearTimeout(processingTimer);
  processingTimer = null;
}
