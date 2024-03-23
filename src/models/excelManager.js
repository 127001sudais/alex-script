import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function storeFrozenAccount(
  address,
  amount,
  transactionSignature,
  transactionDate
) {
  const filePath = path.join(__dirname, "frozenAccounts.xlsx");
  let workbook;
  const sheetName = "FrozenAccounts";
  try {
    workbook = XLSX.readFile(filePath);
  } catch (error) {
    console.log(chalk.blue("Info:"), 'New sheet "FrozenAccounts" created.');
    workbook = XLSX.utils.book_new();
  }

  let worksheet;
  if (!workbook.Sheets[sheetName]) {
    worksheet = XLSX.utils.aoa_to_sheet([
      ["Address", "Amount", "TransactionSignature", "TransactionDate"],
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    console.info(`New sheet "Frozen Accounts" created.`);
  } else {
    worksheet = workbook.Sheets[sheetName];
  }

  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const nextRow = range.e.r + 2;

  XLSX.utils.sheet_add_json(
    worksheet,
    [
      {
        Address: address,
        Amount: amount,
        TransactionSignature: transactionSignature,
        TransactionDate: transactionDate,
      },
    ],
    { origin: -1, skipHeader: true }
  );

  XLSX.writeFile(workbook, filePath);
  console.info(
    `${chalk.blue(`Info`)}: Account ${chalk.cyan(
      address
    )} with amount ${chalk.green(amount)} has been successfully stored.` +
      `\nTransaction Signature: ${chalk.cyanBright.bold(
        transactionSignature
      )} at ${transactionDate}`
  );
}
