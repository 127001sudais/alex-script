import { Connection, clusterApiUrl } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";
import { parseGetParsedTransactions } from "../utils/parseGetParsedTransactions.js";

let connection = new Connection(RPC_URL, "confirmed");
// let connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

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
      // console.log(filtered);

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
//   "4Yc8wd7NNaQuxr9BFfBR2S5bkC4rmNCHDYfd4bk7CKfS48V2FieqwTpNprGK6pEYN18qCoHDD3cyPaCgSsB7c5iJ",
// ]);
