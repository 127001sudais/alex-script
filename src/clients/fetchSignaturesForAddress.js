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

    if (!signatures || signatures.length === 0) {
      console.log(
        chalk.yellow(`No signatures found for address: ${account_address}`)
      );
      return [];
    }

    const signature = parseGetSingaturesForAddress(signatures);

    return signature;
  } catch (error) {
    console.error(
      chalk.red(
        `Error occurred while fetching transaction signatures for address ${account_address}.`
      ),
      chalk.yellow(`Limit set to: ${limit}.`),
      chalk.magenta(`Error message: ${error.message}`)
    );

    // debugging
    throw new Error(
      `Failed to fetch signatures for address ${account_address}: ${error.message}`
    );
  }
}
