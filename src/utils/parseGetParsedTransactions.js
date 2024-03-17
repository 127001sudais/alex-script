import chalk from "chalk";
import { MINT_ADDRESS, DECIMAL } from "../constants/constatnt.js";

// ⚠️⚠️[ WARNING ] write a custom parser to decode the response, this code does not work in devnet or localhost as of march 18 2024.

/** This function extracts and processes transactions based on specific criteria.
It checks for transactions that match the "transferChecked" type and have a mint address matching the predefined MINT_ADDRESS.
It then constructs a result object for each matching transaction, including details like mint address, sender, receiver, amount, and transaction signature.*/
export function extractTransactions(transaction) {
  const results = [];

  if (!transaction?.meta?.innerInstructions) {
    console.log(
      chalk.yellow(
        `[Warning] Transaction ${transaction.transaction.signatures} has no innerInstructions.`
      )
    );
    return results;
  }

  // Iterate over each innerInstruction within the transaction.
  transaction.meta.innerInstructions.forEach((innerInstruction) => {
    // For each innerInstruction, iterate over its instructions.
    innerInstruction.instructions.forEach((instruction) => {
      if (!instruction.parsed) {
        console.log(chalk.yellow("[Warning] Instruction not parsed."));
        return;
      }

      const { parsed: parsedInfo } = instruction;
      if (
        parsedInfo.type === "transferChecked" &&
        parsedInfo.info &&
        parsedInfo.info.mint === MINT_ADDRESS
      ) {
        console.log(
          chalk.bgGreen("[Passed] TransferChecked and mintID matched.")
        );
        results.push({
          mintAddress: parsedInfo.info.mint,
          sender: parsedInfo.info.source,
          receiver: parsedInfo.info.destination,
          amount: parsedInfo.info.tokenAmount.amount / Math.pow(10, DECIMAL),
          transactionSignature: transaction.transaction.signatures,
        });
      } else {
        console.log(chalk.yellow("[Warning] Transaction type mismatch."));
      }
    });
  });

  return results;
}

/** This function processes a list of transactions, extracting relevant information based on their version.
It iterates over each transaction, checks its version, and calls the extractTransactions function for further processing.
The results from extractTransactions are accumulated into a single array, which is returned at the end. */
export function parseGetParsedTransactions(transactions) {
  let results = [];

  transactions.forEach((transaction) => {
    if (!transaction || !transaction.meta) {
      console.log(
        chalk.yellow("[Warning] Transaction or transaction.meta is undefined.")
      );
      return;
    }
    console.log(
      `Processing transaction: ${chalk.cyan(
        transaction.transaction.signatures
      )}`
    );
    switch (transaction.version) {
      case 0:
        results = [...results, ...extractTransactions(transaction)];
        break;

      case "legacy":
        console.log(chalk.blue("[INFO] LEGACY version detected"));
        results = [...results, ...extractTransactions(transaction)];
        break;

      default:
        console.log(
          chalk.bgBlue("[INFO] Unknown transaction version detected. "),
          transaction.version
        );
    }
  });
  console.log(`Total extracted transactions: ${results.length}`);
  return results;
}
