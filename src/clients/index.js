import chalk from "chalk";
import { PublicKey } from "@solana/web3.js";
import { fetchParsedTransactions } from "./fetchParsedTransactions.js";
import { fetchSignaturesForAddress } from "./fetchSignaturesForAddress.js";
import { SubscribeToAccount, accountUpdateEmitter } from "./webSocketClient.js";
import { checkAddresAgainstWhiteListedAddress } from "../models/whiteListChecker.js";
import { TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";

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
    console.log(chalk.magentaBright("=".repeat(100)));
    console.log(chalk.blue(`[INFO] Account update detected.`));

    const accountPublicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);
    try {
      const signatures = await fetchSignaturesForAddress(accountPublicKey);
      if (signatures && signatures.length > 0) {
        const transactions = await fetchParsedTransactions(signatures);
        for (const transaction of transactions) {
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
  });
}
