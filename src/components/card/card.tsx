import { ReactNode } from "react";
import { Card as CardElement } from "react-bootstrap";

import "./card.scss";

interface CardProps {
  readonly header: string;
  readonly children: ReactNode;
  readonly hidden?: boolean;
}

export default function Card({ hidden, header, children }: CardProps) {
  return (
    <div hidden={hidden} className="card-wrapper">
      <CardElement className="text-center">
        <CardElement.Header>{header}</CardElement.Header>
        <CardElement.Body>{children}</CardElement.Body>
      </CardElement>
    </div>
  );
}
