import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function storeFrozenAccount(
  address,
  amount,
  transactionSignature
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
      ["Address", "Amount", "TransactionSignature"],
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
      },
    ],
    { origin: -1, skipHeader: true }
  );

  XLSX.writeFile(workbook, filePath);
  console.info(
    `Account ${address} with amount ${amount} and \n transacitonSignature ${transactionSignature} stored successfully.`
  );
}

// await storeFrozenAccount(
//   "3HkSLidfgeLyM1izEZMvB4eKHi94U4HWbBdfvY48Vpq3",
//   5,
//   "Pn53nwweUKzSZ7tZrsZ1wh3HCG3F9HGWthPwQUJpyGcydKaGxnpdzjqmUz34FGqh7acXWTvhK976rMNQmwucscP"
// );
