import chalk from "chalk";
import { Connection, PublicKey } from "@solana/web3.js";
import { RPC_URL, TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";
import { parseGetSingaturesForAddress } from "../utils/parseGetSignaturesForAddress.js";

let connection = new Connection(RPC_URL, "confirmed");

export async function fetchSignaturesForAddress(account_address, limit) {
  try {
    const options = {
      limit: limit,
    };
    const signatures = await connection.getSignaturesForAddress(
      account_address,
      options,
      "confirmed"
    );

    const signature = parseGetSingaturesForAddress(signatures);

    console.log("[SIGNATURE]", signature);

    return signature;
  } catch (error) {
    console.error(
      chalk.red(
        `Error fetching transaction signatures for address ${account_address}: ${error.message}`
      )
    );
  }
}
