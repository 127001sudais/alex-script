import chalk from "chalk";
import { Connection } from "@solana/web3.js";
import { RPC_URL } from "../constants/constatnt.js";

const connection = new Connection(RPC_URL, "confirmed");

async function fetchBlockTime(slot) {
  const blockTime = await connection.getBlockTime(slot);
  const parsedBlockTime = new Date(blockTime * 1000).toISOString();

  if (parsedBlockTime) {
    console.log(`[blockTime] `, parsedBlockTime);
  } else {
    console.log(`Unable to fetch block time`);
  }
  return parsedBlockTime;
}

// fetchBlockTime(255824825);
