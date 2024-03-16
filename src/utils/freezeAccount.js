import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  FREEZE_AUTHORITY_SECRET_KEY,
  MINT_ADDRESS,
  RPC_URL,
} from "../constants/constatnt.js";
import { freezeAccount } from "@solana/spl-token";

const connection = new Connection(RPC_URL, "confirmed");
const mintPublicKey = new PublicKey(MINT_ADDRESS);

export async function freezeNonWhiteListedAccount(
  accountPublicKey,
  balance,
  transactionSignature
) {
  try {
    const freezeAuthorityKeyPair = Keypair.fromSecretKey(
      FREEZE_AUTHORITY_SECRET_KEY
    );

    const signature = await freezeAccount(
      connection,
      freezeAuthorityKeyPair,
      accountPublicKey,
      mintPublicKey,
      freezeAuthorityKeyPair
    );

    console.log(
      ` ✅ 🥶 ${accountPublicKey.toString()} has been frozen.\n Transaction signature: ${signature}`
    );
  } catch (error) {
    console.error(
      `❌ Error during freezing account ${accountPublicKey.toString()}`,
      error
    );
  }
}

freezeNonWhiteListedAccount("3HkSLidfgeLyM1izEZMvB4eKHi94U4HWbBdfvY48Vpq3");
