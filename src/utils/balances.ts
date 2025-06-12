import BigNumber from "bignumber.js";

import { Balance } from "types/blockchain";
import { Order, OrderDirection } from "types/sorting";

export const filterAndSortBalances = (
  balances: Balance[],
  filter: string,
  sortOrder: Order
): Balance[] => {
  return balances
    .filter((balance) =>
      balance.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const aAmount = new BigNumber(a.amount);
      const bAmount = new BigNumber(b.amount);

      return sortOrder === OrderDirection.ASC
        ? aAmount.minus(bAmount).toNumber()
        : bAmount.minus(aAmount).toNumber();
    });
};
