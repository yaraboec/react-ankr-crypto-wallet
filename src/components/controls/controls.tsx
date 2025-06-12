import { Form } from "react-bootstrap";

import { Order, OrderDirection } from "types/sorting";

import "./controls.scss";

interface ControlsProps {
  readonly filter: string;
  readonly setFilter: (filter: string) => void;
  readonly sortOrder: Order;
  readonly setSortOrder: (order: Order) => void;
}

export default function Controls({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
}: ControlsProps) {
  return (
    <div className="controls">
      <Form.Control
        className="filter-input"
        type="text"
        placeholder="Search by token"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Form.Select
        className="sorting-select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as Order)}
      >
        <option value={OrderDirection.ASC}>Sort by amount ↑</option>
        <option value={OrderDirection.DESC}>Sort by amount ↓</option>
      </Form.Select>
    </div>
  );
}
