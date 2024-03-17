import chalk from "chalk";

import { Connection } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";
import { parseGetParsedTransactions } from "../utils/parseGetParsedTransactions.js";

let connection = new Connection(RPC_URL, "confirmed");

export async function fetchParsedTransactions(transactionSignature) {
  try {
    const config = {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    };

    const parsedTransaction = await connection.getParsedTransactions(
      transactionSignature,
      config
    );

    if (parsedTransaction) {
      let filtered = parseGetParsedTransactions(parsedTransaction);
      // console.log(`Sender: `, filtered.sender);
      // console.log(`Reciever: `, filtered.receiver);
      // console.log(`mintID: `, filtered[0].mintAddress);

      return filtered;
    } else {
      console.log(
        chalk.blue("Info: No transaction found with the given signature.")
      );
      return [];
    }
  } catch (error) {
    console.error(
      chalk.bgRed("Error fetching parsed transaction details:"),
      error.message
    );
    throw new Error("Failed to fetch parsed transaction details.");
  }
}
