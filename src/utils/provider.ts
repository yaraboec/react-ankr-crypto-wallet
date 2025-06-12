import { AnkrProvider, Blockchain } from "@ankr.com/ankr.js";
import { PROVIDER_ENDPOINT } from "config";

const provider = new AnkrProvider(PROVIDER_ENDPOINT);

export const getBalance = async (address: string) => {
  const balance = await provider.getAccountBalance({
    walletAddress: address,
    blockchain: "eth",
  });

  return balance;
};

export const getTokenPrice = async (blockchain: string) => {
  const tokenPrice = await provider.getTokenPrice({
    blockchain: blockchain as Blockchain,
  });
  return tokenPrice;
};
