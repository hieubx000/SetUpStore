import React from "react";

import { Tag, Space, List, Avatar, Statistic } from "antd";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

function OrderProductsList({ loading, order }) {
  return (
    <List
      grid={{ gutter: 24, column: 3 }}
      loading={loading}
      header={<ShowPaymentInfo order={order} />}
      dataSource={order.products}
      renderItem={(p) => (
        <List.Item key={p.product._id} style={{ marginTop: 12, padding: 0 }}>
          <List.Item.Meta
            avatar={<Avatar size={100} shape="square" src={p.product.images[0].url} />}
            title={p.product.name}
            description={
              <Space>
                <Tag>x{p.count}</Tag>
                <Tag color={p.color.toLowerCase() !== "white" && p.color.toLowerCase()}>{p.color}</Tag>
                <Statistic valueStyle={{ fontSize: 16 }} value={p.product.price} groupSeparator="." prefix="$" />
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default OrderProductsList;
