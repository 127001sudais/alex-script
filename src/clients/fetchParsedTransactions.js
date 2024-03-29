import chalk from "chalk";
import { Connection } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";
import { parseGetParsedTransactions } from "../utils/parseGetParsedTransactions.js";

let connection = new Connection(RPC_URL, "confirmed");

export async function fetchParsedTransactions(transactionSignature) {
  try {
    if (!transactionSignature || transactionSignature.length === 0) {
      console.log(
        chalk.bgYellow(
          "Warning: transactionSignature array is empty or undefined."
        )
      );
      return [];
    }

    const config = {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    };

    const parsedTransaction = await connection.getParsedTransactions(
      transactionSignature,
      config
    );

    if (!parsedTransaction || parsedTransaction.length === 0) {
      console.log(
        chalk.blue("Info: No transactions found with the given signatures.")
      );
      return [];
    } else {
      let filtered = parseGetParsedTransactions(parsedTransaction);
      return filtered;
    }
  } catch (error) {
    console.error(
      chalk.red("[Error] fetching parsed transaction details:"),
      error.message
    );
    throw new Error("Failed to fetch parsed transaction details.");
  }
}
