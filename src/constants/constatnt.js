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
export const MINT_ADDRESS = "";
export const TOKEN_ACCOUNT_ADDRESS = "";
export const DECIMAL = 9;

export const FREEZE_AUTHORITY_SECRET_KEY = new Uint8Array();
