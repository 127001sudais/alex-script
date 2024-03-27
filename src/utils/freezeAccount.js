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

const RETRY_LIMIT = 3;
const RETRY_DELAY = 2000;

export async function freezeNonWhiteListedAccount(
  accountPublicKey,
  amount,
  transactionDate,
  amountOfSOL,
  ownerAddress
) {
  try {
    const freezeAuthorityKeyPair = Keypair.fromSecretKey(
      FREEZE_AUTHORITY_SECRET_KEY
    );

    console.log(
      chalk.blue(`Attempting to freeze account:`),
      `${chalk.yellow(
        accountPublicKey.toString()
      )} with SPL-token: ${chalk.greenBright(amount)}`
    );

    const signature = await retryFreezeAccount(
      freezeAuthorityKeyPair,
      accountPublicKey,
      amount,
      0
    );

    console.log(
      chalk.green(`[Success]`) +
        chalk.white(
          ` Wallet ${chalk.yellow(
            accountPublicKey.toString()
          )} has been frozen successfully.\n ${chalk.cyan(
            `URL: https://solscan.io/tx/` + signature
          )}`
        )
    );
    await storeFrozenAccount(
      accountPublicKey,
      amount,
      signature,
      transactionDate,
      amountOfSOL,
      ownerAddress
    );
  } catch (error) {
    console.error(
      chalk.red(
        `[ERROR] Failed to freeze account ${chalk.cyan(
          accountPublicKey.toString()
        )}. Error: ${error.message}`
      )
    );
    throw error;
  }
}

async function retryFreezeAccount(
  freezeAuthorityKeyPair,
  accountPublicKey,
  amount,
  attempt
) {
  try {
    return await freezeAccount(
      connection,
      freezeAuthorityKeyPair,
      accountPublicKey,
      mintPublicKey,
      freezeAuthorityKeyPair
    );
  } catch (error) {
    if (attempt < RETRY_LIMIT) {
      console.log(
        chalk.red(
          `Attempt ${
            attempt + 1
          } failed for freezing account ${accountPublicKey.toString()}. Retrying in ${RETRY_DELAY}ms...`
        )
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return retryFreezeAccount(
        freezeAuthorityKeyPair,
        accountPublicKey,
        amount,
        attempt + 1
      );
    } else {
      throw new Error(
        `After ${RETRY_LIMIT} attempts, failed to freeze account ${chalk.blue(
          accountPublicKey.toString()
        )}: ${error.message}`
      );
    }
  }
}
