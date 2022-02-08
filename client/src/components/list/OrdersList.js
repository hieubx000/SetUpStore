import React from "react";

import { List } from "antd";
import OrderProductsList from "./OrderProductsList";

function OrdersList({ loading, orders }) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={false}
      dataSource={orders}
      renderItem={(order) => <OrderProductsList loading={loading} order={order} />}
    />
  );
}

export default OrdersList;
