export function parseGetSingaturesForAddress(transactions) {
  return transactions.map((transaction) => transaction.signature);
}
