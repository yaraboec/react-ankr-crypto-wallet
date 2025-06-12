import { Blockchain } from "@ankr.com/ankr.js";

export interface Balance {
  id: number;
  name: string;
  amount: string;
}

export interface BlockchainDetails {
  name: Blockchain;
  displayName: string;
}

export const blockchains: BlockchainDetails[] = [
  { name: "arbitrum", displayName: "Arbitrum" },
  { name: "avalanche", displayName: "Avalanche" },
  { name: "avalanche_fuji", displayName: "Avalanche Fuji" },
  { name: "base", displayName: "Base" },
  { name: "base_sepolia", displayName: "Base Sepolia" },
  { name: "bsc", displayName: "BSC" },
  { name: "eth", displayName: "ETH" },
  { name: "eth_holesky", displayName: "ETH Holesky" },
  { name: "eth_sepolia", displayName: "ETH Sepolia" },
  { name: "fantom", displayName: "Fantom" },
  { name: "flare", displayName: "Flare" },
  { name: "gnosis", displayName: "Gnosis" },
  { name: "incentiv_devnet", displayName: "Incentiv Devnet" },
  { name: "linea", displayName: "Linea" },
  { name: "neura_devnet", displayName: "Neura Devnet" },
  { name: "neura_testnet_v1", displayName: "Neura Testnet" },
  { name: "optimism", displayName: "Optimism" },
  { name: "optimism_testnet", displayName: "Optimism Testnet" },
  { name: "polygon", displayName: "Polygon" },
  { name: "polygon_amoy", displayName: "Polygon Amoy" },
  { name: "polygon_zkevm", displayName: "Polygon zkEVM" },
  { name: "rollux", displayName: "Rollux" },
  { name: "scroll", displayName: "Scroll" },
  { name: "story_mainnet", displayName: "Story" },
  { name: "story_aeneid_testnet", displayName: "Story Aeneid Testnet" },
  { name: "syscoin", displayName: "Syscoin" },
  { name: "telos", displayName: "Telos" },
  { name: "xai", displayName: "xAI" },
  { name: "xlayer", displayName: "X Layer" },
];
