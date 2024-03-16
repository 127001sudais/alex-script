import { Connection, PublicKey } from "@solana/web3.js";
import { RPC_URL, TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";
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
    console.log(`[parseGetSingaturesForAddress] `, signature);
    return signature;
  } catch (error) {
    console.error(error, "[fetchSignatureForAddress]");
  }
}

// const publicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);
// fetchSignaturesForAddress(publicKey);
