import { MINT_ADDRESS } from "../constants/constatnt.js";

export function parseGetParsedTransactions(transactions) {
  let results = [];

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
              parsedInfo.info
              //  &&
              // parsedInfo.info.mint === MINT_ADDRESS
            ) {
              results.push({
                mintAddress: parsedInfo.info.mint,
                sender: parsedInfo.info.source,
                receiver: parsedInfo.info.destination,
                amount: parsedInfo.info.tokenAmount.amount / Math.pow(10, 9),
                transactionSignature: transaction.transaction.signatures[0],
              });
              console.log(`[Parsing response fromt the server ⌛⏳]`);
              // console.log(`Mint address: `, parsedInfo.info.mint);
              // console.log(`Sender: `, parsedInfo.info.source);
              // console.log(`Receiver: `, parsedInfo.info.destination);
              // console.log(
              //   `Amount: `,
              //   parsedInfo.info.tokenAmount.amount / Math.pow(10, 9)
              // );
            }
          });
        });
        break;
      case "legacy":
        console.log(
          `!👴👴👴LEGACY VERSION DETECTED 👴👴👴`,
          transaction.version
        );

        const parsedLegacyInfo =
          transaction.transaction.message.instructions[0].parsed.info;
        results.push({
          mintAddress: parsedLegacyInfo.mint,
          sender: parsedLegacyInfo.source,
          receiver: parsedLegacyInfo.destination,
          amount: parsedLegacyInfo.tokenAmount.amount / Math.pow(10, 9),
          transactionSignature: transaction.transaction.signatures[0],
        });
        // console.log(parsedLegacyInfo.mint);
        // console.log(parsedLegacyInfo);

        break;
      default:
        console.log("Unknown transaction version: ", transaction.version);
    }
  });
  return results;
}

/**[
  {
    blockTime: 1710600380,
    meta: {
      computeUnitsConsumed: 6200,
      err: null,
      fee: 5000,
      innerInstructions: [],
      logMessages: [Array],
      postBalances: [Array],
      postTokenBalances: [Array],
      preBalances: [Array],
      preTokenBalances: [Array],
      rewards: [],
      status: [Object],
      loadedAddresses: undefined
    },
    slot: 1914,
    transaction: { message: [Object], signatures: [Array] },
    version: 'legacy'
  }
] */
