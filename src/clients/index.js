import { accountUpdateEmitter, SubscribeToAccount } from "./webSocketClient.js";
import { fetchSignaturesForAddress } from "./fetchSignaturesForAddress.js";
import { fetchParsedTransactions } from "./fetchParsedTransactions.js";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_ACCOUNT_ADDRESS } from "../constants/constatnt.js";

SubscribeToAccount();

accountUpdateEmitter.on("update", async (accountInfo) => {
  console.log(`Receiver account update: `, accountInfo);

  const accountPublicKey = new PublicKey(TOKEN_ACCOUNT_ADDRESS);

  try {
    const signatures = await fetchSignaturesForAddress(accountPublicKey);

    if (signatures && signatures.length > 0) {
      console.log(`Fetching transactions`);
      const transactions = await fetchParsedTransactions(signatures);
      console.log(`live transaction: `, transactions);
    } else {
      console.log("No signatures found for the the give address.");
    }
  } catch (error) {
    console.error(``, error);
  }
});
