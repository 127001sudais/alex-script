import { EventEmitter } from "events";
import { Connection, PublicKey } from "@solana/web3.js";
import { RPC_URL, TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";

export const accountUpdateEmitter = new EventEmitter();

let connection = new Connection(RPC_URL, "confirmed");
let accountPublicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);

export async function SubscribeToAccount() {
  try {
    const subscriptionId = connection.onAccountChange(
      accountPublicKey,
      (accountInfo, context) => {
        accountUpdateEmitter.emit("update", accountInfo);
      },
      "confirmed"
    );
    console.log(`Connected to: `, RPC_URL);
    console.log(`Subscribing to: `, TOKEN_ACCOUNT_ADDRESS);
  } catch (error) {
    console.error(error, "[SubscribeToAccount]");
  }
}
