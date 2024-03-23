import chalk from "chalk";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";

const connection = new Connection(RPC_URL, "confirmed");

export async function fetchBalance(publickey) {
  const lamports = await connection.getBalance(publickey);
  const sol = lamports / LAMPORTS_PER_SOL;
  // console.log(chalk.red(`[amount of SOL]`, sol));
  return sol;
}

// const addreass = new PublicKey("92BZ3vW7Lwx5D2HvoHktzczCdxT1C38cZJUsRZdHyHA9");
// fetchBalance(addreass);
