import { MINT_ADDRESS } from "../constants/constatnt.js";

export function parseGetParsedTransactions(transactions) {
  transactions.forEach((transaction) => {
    if (!transaction || !transaction.meta) return;

    console.log("*=".repeat(45));
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
              console.log(`[Parsing response fromt the server ⌛⏳]`);
              console.log(`Mint address: `, parsedInfo.info.mint);
              console.log(`Sender: `, parsedInfo.info.source);
              console.log(`Receiver: `, parsedInfo.info.destination);
              console.log(
                `Amount: `,
                parsedInfo.info.tokenAmount.amount / Math.pow(10, 9)
              );
            }
          });
        });
        break;
      case "legacy":
        console.log(`Transaction Version: `, transaction.version);
        break;
      default:
        console.log("Unknown transaction version: ", transaction.version);
    }
  });
}
