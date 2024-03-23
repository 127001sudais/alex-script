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
/***/
export const RPC_URL = "http://127.0.0.1:8899";
// export const RPC_URL = "https://api.mainnet-beta.solana.com";
export const WebSocket_URL = "ws://localhost:8900/";

export const MINT_ADDRESS = "48TbUmJ8hKz6GDhDtWquh1tF4htUCKfjsVsMYh6AiRxE";
export const TOKEN_ACCOUNT_ADDRESS =
  "DKajrWg4iJzWvDzzyJFMbme9HRD7DbHqzq8Qfupf1rbB";
export const DECIMAL = 9;

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
/** 
export const RPC_URL = "https://api.mainnet-beta.solana.com";
export const WebSocket_URL = "wss://api.mainnet-beta.solana.com/";
export const MINT_ADDRESS = "8GXLMZSKSxPSmLUGpRN3UuFo3Y1ngB3Frg2yPhZosVde";
export const TOKEN_ACCOUNT_ADDRESS =
  "E3vkeTAdHcoXL6Fe8hDHLCMLNfWQumSK5Z5zVnwmDvtB";
export const DECIMAL = 9;
*/

export const SET_TIMER = 2;
export const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array([
  143, 155, 66, 148, 220, 166, 73, 204, 41, 140, 252, 140, 65, 59, 89, 251, 36,
  241, 21, 197, 161, 116, 104, 203, 52, 126, 73, 136, 96, 235, 83, 62, 219, 25,
  29, 174, 231, 104, 136, 218, 176, 149, 127, 196, 117, 129, 96, 150, 234, 5,
  143, 70, 135, 60, 245, 77, 41, 40, 153, 13, 83, 250, 155, 231,
]);
