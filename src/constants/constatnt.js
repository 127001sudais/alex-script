/**
 * Configuration Constants for SPL-Token Monitor Script
 *
 * This file contains the configurations for different environments
 * such as localhost (solana-test-validator), devnet, and mainnet.
 * Uncomment the section that corresponds to your target environment.
 * Make sure to update the constants with your specific details.
 */

// ------------------------
// LOCALHOST CONFIGURATION
// ------------------------
/**
export const RPC_URL = "http://127.0.0.1:8899";
export const WebSocket_URL = "ws://localhost:8900/";
export const MINT_ADDRESS = "48TbUmJ8hKz6GDhDtWquh1tF4htUCKfjsVsMYh6AiRxE";
export const TOKEN_ACCOUNT_ADDRESS =
  "DKajrWg4iJzWvDzzyJFMbme9HRD7DbHqzq8Qfupf1rbB";
export const DECIMAL = 9;
*/
// ------------------------
// DEVNET CONFIGURATION
// ------------------------
//  export const RPC_URL = "https://api.devnet.solana.com";
// export const WebSocket_URL = "wss://api.devnet.solana.com/";
// export const MINT_ADDRESS = "";
// export const TOKEN_ACCOUNT_ADDRESS = "";

// ------------------------
// MAINNET CONFIGURATION
// ------------------------
/** */
export const RPC_URL = "https://api.mainnet-beta.solana.com";
export const WebSocket_URL = "wss://api.mainnet-beta.solana.com/";
export const MINT_ADDRESS = "53oz9TXrCso8aTtjYKhyZTJvdsLiccVgLhXHdND94E6k";
export const TOKEN_ACCOUNT_ADDRESS =
  "AaGvPRyX9LhdB7YXjdhyKFUo42FYTbNrPHuLyeLDRfHH";
export const DECIMAL = 9;

export const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array([
  121, 248, 221, 192, 101, 60, 141, 61, 109, 114, 97, 114, 13, 25, 179, 64, 141,
  201, 161, 144, 54, 62, 47, 202, 95, 215, 159, 88, 232, 208, 11, 208, 76, 169,
  238, 114, 217, 230, 244, 197, 238, 27, 175, 174, 18, 58, 5, 87, 7, 72, 108,
  194, 147, 197, 88, 109, 159, 76, 22, 252, 42, 11, 183, 2,
]);
