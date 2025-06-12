import BigNumber from "bignumber.js";

import { blockchains, BlockchainDetails, Balance } from "../types/blockchain";
import { getBalance } from "./provider";

export const getConvertedWalletBalances = async (
  address: string,
  tokenPrice: string
): Promise<Balance[]> => {
  const balances: Balance[] = [];

  const balance = await getBalance(address);
  for (let i = 0; i < balance.assets.length; i++) {
    const asset = balance.assets[i];
    const tokenAmount = getTokenAmount(tokenPrice, asset.balanceUsd);
    const token: Balance = {
      id: i + 1,
      name: asset.tokenName,
      amount: tokenAmount,
    };
    balances.push(token);
  }

  return balances;
};

export const getBlockchainDetails = (
  blockchainName: string
): BlockchainDetails | null => {
  const blockchainDetail = blockchains.find(
    (blockchain) => blockchain.name === blockchainName
  );
  if (!blockchainDetail) {
    return null;
  }

  return blockchainDetail;
};

export const getTokenAmount = (
  outputTokenPrice: string,
  inputTokenBalance: string
): string => {
  const outputTokenPriceRaw = new BigNumber(outputTokenPrice);
  const inputTokenBalanceRaw = new BigNumber(inputTokenBalance);

  let outputTokenAmount = new BigNumber("0");
  if (
    inputTokenBalanceRaw.isPositive() &&
    !inputTokenBalanceRaw.isZero() &&
    !outputTokenPriceRaw.isZero()
  ) {
    outputTokenAmount = inputTokenBalanceRaw.dividedBy(outputTokenPriceRaw);
  }

  return outputTokenAmount.toString();
};
