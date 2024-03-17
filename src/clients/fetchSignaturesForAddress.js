import chalk from "chalk";
import { Connection } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";
import { parseGetSingaturesForAddress } from "../utils/parseGetSignaturesForAddress.js";

let connection = new Connection(RPC_URL, "confirmed");

export async function fetchSignaturesForAddress(account_address, limit) {
  try {
    // Define the options for fetching signatures, including the limit of signatures to retrieve.
    const options = {
      limit: limit,
    };
    const signatures = await connection.getSignaturesForAddress(
      account_address,
      options,
      "confirmed"
    );

    const signature = parseGetSingaturesForAddress(signatures);

    return signature;
  } catch (error) {
    console.error(
      chalk.red(
        `Error fetching transaction signatures for address ${account_address}: ${error.message}`
      )
    );
    throw new Error(
      `Failed to fetch signatures for address ${account_address}: ${error.message}`
    );
  }
}
