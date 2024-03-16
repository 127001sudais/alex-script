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
      console.log("Transaction not found or failed to parse");
      return [];
    }
  } catch (error) {
    console.log(error, "[fetchParsedTransactionDetails]");
    throw error;
  }
}

// fetchParsedTransactions([
//   "5ugM5FkKtEgHNja7wQtgFc1BQ1UERB6Eh1yuUfKABfSrdNFBwhUD9QPtFEPLZJBRSwKy63EfPHNg7QkR3tyKZzYP",
//   "5tPasxXSXRWjV4Q18CgnpjXA1MxJRACRYYvSyJR8nwfaZPr7aab8NefBmUiMpJfn3P7EmwgjX8GiUo1i6ivDzM8W",
//   "5i6i4vbJkHk13HnimmtGDjdZpvXvEbimT55U6Li37zH3zJJTG6rfAJkGuHBjxmrPqrp4ZVXUYh2hZTPiHuLC9bim",
// ]);
