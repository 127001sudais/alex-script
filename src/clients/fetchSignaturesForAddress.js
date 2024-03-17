import chalk from "chalk";
import { Connection } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";
import { parseGetSingaturesForAddress } from "../utils/parseGetSignaturesForAddress.js";

let connection = new Connection(RPC_URL, "confirmed");

export async function fetchSignaturesForAddress(account_address) {
  try {
    const options = {
      limit: 1,
    };
    const signatures = await connection.getSignaturesForAddress(
      account_address,
      options
    );

    const signature = parseGetSingaturesForAddress(signatures);
    console.log("[SIGNATURE]", signature);

    return signature;
  } catch (error) {
    let errorMessage = `[ERROR] An errror occured while fetching signatures for address ${chalk.cyan(
      account_address
    )}.`;

    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    } else {
      errorMessage += `Unexpected error: ${JSON.stringify(error)}`;
    }

    console.log(chalk.red(errorMessage));
  }
}
