/** SETUP FOR LOCALHOST(solana-test-validator)*/

export const RPC_URL = "http://127.0.0.1:8899";

// export const RPC_URL = "https://api.devnet.solana.com";

export const WebSocket_URL = "ws://localhost:8900/";

export const MINT_ADDRESS = "48TbUmJ8hKz6GDhDtWquh1tF4htUCKfjsVsMYh6AiRxE";
export const TOKEN_ACCOUNT_ADDRESS =
  "DKajrWg4iJzWvDzzyJFMbme9HRD7DbHqzq8Qfupf1rbB";

export const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array([
  143, 155, 66, 148, 220, 166, 73, 204, 41, 140, 252, 140, 65, 59, 89, 251, 36,
  241, 21, 197, 161, 116, 104, 203, 52, 126, 73, 136, 96, 235, 83, 62, 219, 25,
  29, 174, 231, 104, 136, 218, 176, 149, 127, 196, 117, 129, 96, 150, 234, 5,
  143, 70, 135, 60, 245, 77, 41, 40, 153, 13, 83, 250, 155, 231,
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
