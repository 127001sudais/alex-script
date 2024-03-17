import chalk from "chalk";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { freezeAccount } from "@solana/spl-token";
import {
  FREEZE_AUTHORITY_SECRET_KEY,
  MINT_ADDRESS,
  RPC_URL,
} from "../constants/constatnt.js";
import { storeFrozenAccount } from "../models/excelManager.js";

const connection = new Connection(RPC_URL, "confirmed");
const mintPublicKey = new PublicKey(MINT_ADDRESS);

export async function freezeNonWhiteListedAccount(
  accountPublicKey,
  amount,
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
      chalk.green(`✅ [SUCCESS]`) +
        chalk.white(
          ` Wallet ${accountPublicKey.toString()} has been frozen successfully.`
        ) +
        `\n` +
        chalk.bold(`Transaction Signature:`) +
        chalk.yellow(` ${signature}`)
    );
    storeFrozenAccount(accountPublicKey, amount, transactionSignature);
  } catch (error) {
    let errorMessage = `[ERROR] An error occurred while trying to freeze account ${chalk.cyan(
      accountPublicKey.toString()
    )}.`;

    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    } else {
      errorMessage += ` Unexpected error: ${JSON.stringify(error)}`;
    }

    console.error(chalk.red(errorMessage));
  }
}
