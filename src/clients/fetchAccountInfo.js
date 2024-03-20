import { AccountLayout } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";
import chalk from "chalk";

const connection = new Connection(RPC_URL, "confirmed");

export async function fetchOwnerOfTokenAccount(tokenAccountPubKey) {
  const tokenAccountPubKeyObj = new PublicKey(tokenAccountPubKey);

  try {
    const tokenAccountInfo = await connection.getAccountInfo(
      tokenAccountPubKeyObj
    );
    if (tokenAccountInfo === null) {
      console.log(
        chalk.yellow("[Warning] Token account not found or doesn't exist.")
      );
      return;
    }

    const accountData = AccountLayout.decode(tokenAccountInfo.data);
    const ownerWalletAddress = accountData.owner.toString();

    // console.log(ownerWalletAddress);

    return ownerWalletAddress;
  } catch (error) {
    console.error(
      chalk.red("[Error] fetching or decoding account information:", error)
    );
  }
}

// const tokenAccountAddress = "9Gwk8SjeWMUaDJWyFhAwri4aJRaoLwUDZrRZGhR9pzCn";
// fetchOwnerOfTokenAccount(tokenAccountAddress);
