/** SETUP FOR LOCALHOST(solana-test-validator)*/

export const RPC_URL = "http://127.0.0.1:8899";

// export const RPC_URL = "https://api.devnet.solana.com";

export const WebSocket_URL = "ws://localhost:8900/";

export const MINT_ADDRESS = "48TbUmJ8hKz6GDhDtWquh1tF4htUCKfjsVsMYh6AiRxE";
export const TOKEN_ACCOUNT_ADDRESS =
  "DKajrWg4iJzWvDzzyJFMbme9HRD7DbHqzq8Qfupf1rbB";

export const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array([
  117, 33, 219, 68, 244, 172, 243, 128, 81, 124, 6, 146, 199, 8, 148, 191, 220,
  111, 78, 35, 55, 172, 115, 212, 18, 97, 142, 8, 73, 58, 49, 252, 197, 246, 65,
  37, 146, 116, 121, 115, 124, 166, 93, 203, 142, 224, 28, 225, 141, 178, 104,
  88, 250, 6, 59, 116, 0, 83, 100, 133, 246, 29, 158, 174,
]);

/** SETUP FOR DEVNET 

export const RPC_URL = "https://api.devnet.solana.com";
export const WebSocket_URL = "wss://api.devnet.solana.com/";

export const MINT_ADDRESS = "DU9as9fLQz23tXfnwa4YYLjdscaYCvnuqKubQAb91wCD";
export const TOKEN_ACCOUNT_ADDRESS =
  "CEeoDRFPQBH2RNZXWiWyKuGii4H55SJiX6T1aMcXUYgf";
  */

/** SETUP FOR MAINNET 
export const RPC_URL = "https://api.mainnet-beta.solana.com";
export const WebSocket_URL = "wss://api.mainnet-beta.solana.com/";

export const MINT_ADDRESS = "H24RXEMJ6TK61NrbMZoNxMj2u3yaxJcVMSM65AqfUj9o";

// export const TOKEN_ACCOUNT_ADDRESS =
//   "94ynwucj7htXFG2JWedUMjcPBuuaoerki3JoHCDwxENY";
export const TOKEN_ACCOUNT_ADDRESS =
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";

export const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array([]);
*/
