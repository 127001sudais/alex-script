import chalk from "chalk";
import { MINT_ADDRESS } from "../constants/constatnt.js";

/** LEGACY code
export function parseGetParsedTransactions(transactions) {
  let results = [];

  transactions.forEach((transaction) => {
    if (!transaction || !transaction.meta) return;

    switch (transaction.version) {
      case 0:
        if (!transaction.meta.innerInstructions) return;
        transaction.meta.innerInstructions.forEach((innerInstruction) => {
          innerInstruction.instructions.forEach((instruction) => {
            if (!instruction.parsed) return;

            const parsedInfo = instruction.parsed;
            if (
              parsedInfo.type === "transferChecked" &&
              parsedInfo.info &&
              parsedInfo.info.mint === MINT_ADDRESS
            ) {
              results.push({
                mintAddress: parsedInfo.info.mint,
                sender: parsedInfo.info.source,
                receiver: parsedInfo.info.destination,
                amount: parsedInfo.info.tokenAmount.amount / Math.pow(10, 9),
                transactionSignature: transaction.transaction.signatures[0],
              });
            }
          });
        });
        break;
      case "legacy":
        console.log(chalk.blue(`[INFO] LEGACY version detected `));

        if (!transaction.meta.innerInstructions) return;
        transaction.meta.innerInstructions.forEach((innerInstruction) => {
          innerInstruction.instructions.forEach((instruction) => {
            if (!instruction.parsed) return;

            const parsedInfo = instruction.parsed;
            if (
              parsedInfo.type === "transferChecked" &&
              parsedInfo.info &&
              parsedInfo.info.mint === MINT_ADDRESS
            ) {
              results.push({
                mintAddress: parsedInfo.info.mint,
                sender: parsedInfo.info.source,
                receiver: parsedInfo.info.destination,
                amount: parsedInfo.info.tokenAmount.amount / Math.pow(10, 9),
                transactionSignature: transaction.transaction.signatures[0],
              });
            }
          });
        });

        break;
      default:
        console.log(
          chalk.bgBlue("[INFO] Unknown transaction version: "),
          transaction.version
        );
    }
  });
  return results;
}
 */

function extractTransactions(transaction) {
  const results = [];

  if (!transaction?.meta?.innerInstructions) return results;

  transaction.meta.innerInstructions.forEach((innerInstruction) => {
    innerInstruction.instructions.forEach((instruction) => {
      if (!instruction.parsed) return;

      const { parsed: parsedInfo } = instruction;
      if (
        parsedInfo.type === "transferChecked" &&
        parsedInfo.info &&
        parsedInfo.info.mint === MINT_ADDRESS
      ) {
        console.log(
          chalk.bgGreen("passed transfer checked and mintID matched")
        );
        results.push({
          mintAddress: parsedInfo.info.mint,
          sender: parsedInfo.info.source,
          receiver: parsedInfo.info.destination,
          amount: parsedInfo.info.tokenAmount.amount / Math.pow(10, 9),
          transactionSignature: transaction.transaction.signatures[0],
        });
      }
    });
  });

  return results;
}

export function parseGetParsedTransactions(transactions) {
  let results = [];

  transactions.forEach((transaction) => {
    if (!transaction || !transaction.meta) return;

    switch (transaction.version) {
      case 0:
        results = [...results, ...extractTransactions(transaction)];
        console.log(`results: `, results);
        break;

      case "legacy":
        console.log(chalk.blue("[INFO] LEGACY version detected"));
        results = [...results, ...extractTransactions(transaction)];
        break;

      default:
        console.log(
          chalk.bgBlue("[INFO] Unknown transaction version: "),
          transaction.version
        );
    }
  });

  return results;
}
