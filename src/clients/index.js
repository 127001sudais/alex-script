import chalk from "chalk";

import { PublicKey } from "@solana/web3.js";

import { fetchParsedTransactions } from "./fetchParsedTransactions.js";
import { fetchSignaturesForAddress } from "./fetchSignaturesForAddress.js";
import { SubscribeToAccount, accountUpdateEmitter } from "./webSocketClient.js";

//
import { checkAddresAgainstWhiteListedAddress } from "../models/whiteListChecker.js";

// constants
import { TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";

export async function monitorAccountUpdates() {
  SubscribeToAccount();

  return new Promise((resolve, reject) => {
    accountUpdateEmitter.on("update", async (accountInfo) => {
      console.log(chalk.magentaBright("=".repeat(100)));

      console.log(chalk.blue(`[INFO] Account update Detected`));
      const accountPublicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);

      try {
        const signatures = await fetchSignaturesForAddress(accountPublicKey);

        if (signatures && signatures.length > 0) {
          const transactions = await fetchParsedTransactions(signatures);
          for (const transaction of transactions) {
            // console.log("*".repeat(45));
            // console.log(`sender: `, transaction.sender);
            // console.log(`receiver: `, transaction.receiver);
            // console.log(`amount: `, transaction.amount);
            // console.log(`mintid: `, transaction.mintAddress);
            // console.log(
            //   `TransactionSignature:`,
            //   transaction.transactionSignature
            // );

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
          resolve(transactions);
        } else {
          console.log("first");
          resolve(null);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  });
}
