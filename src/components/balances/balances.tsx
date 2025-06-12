import { useMemo, useState } from "react";
import { Card } from "react-bootstrap";

import Controls from "components/controls/controls";
import { useAppSelector } from "hooks/state";
import { Order, OrderDirection } from "types/sorting";
import { filterAndSortBalances } from "utils/balances";

import "./balances.scss";

export default function Balances() {
  const balances = useAppSelector((state) => state.balances.balances);

  const [filter, setFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<Order>(OrderDirection.ASC);

  const filteredAndSortedBalances = useMemo(() => {
    return filterAndSortBalances(balances, filter, sortOrder);
  }, [balances, filter, sortOrder]);

  return (
    <div className="balances">
      <Controls
        filter={filter}
        setFilter={setFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      {filteredAndSortedBalances.map((balance) => (
        <Card key={balance.id} body>
          <span>{balance.name}</span>
          <span>{balance.amount}</span>
        </Card>
      ))}
    </div>
  );
}
