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

      return filtered;
    } else {
      console.log(
        chalk.blue("Info: Transaction not found or failed to parse.")
      );
      return [];
    }
  } catch (error) {
    console.log(chalk.bgRed("[ERROR] fetchParsedTransactionDetails"), error);
    throw error;
  }
}
