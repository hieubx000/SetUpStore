import React from "react";
import { Link } from "react-router-dom";
import { Empty, Card } from "antd";

function EmptyCard({ type }) {
  const renderDesc = (type) => {
    if (type === "cart") return "Your cart is empty now.";
    if (type === "history") return "History is empty now.";
  };

  return (
    <Card>
      <Empty
        description={
          <span>
            {renderDesc(type)}
            <b>
              <Link to="/store">Continue Shopping.</Link>
            </b>
          </span>
        }
      />
    </Card>
  );
}

export default EmptyCard;
