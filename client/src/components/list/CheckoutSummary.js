import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Typography, Row, Popconfirm, Button, Statistic, Tag, Space, List, Card } from "antd";
import { BsCheckLg, BsXLg } from "react-icons/bs";

function CheckoutSummary({ loading, disabled, products, total, totalAfterDiscount, createCashOrder, emptyCart }) {
  const { COD } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  return (
    <Card>
      <Typography.Title level={3}>Order Summary</Typography.Title>
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={products}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Row justify="space-between">
              <Typography.Text>
                {item.product.name} <Tag color={item.color.toLowerCase() !== "white" && item.color.toLowerCase()}>{item.color}</Tag> x <b>{item.count}</b>
              </Typography.Text>
              <Typography.Text>
                <b>${item.product.price * item.count}</b>
              </Typography.Text>
            </Row>
          </List.Item>
        )}
        header={<div>Products</div>}
        footer={
          totalAfterDiscount > 0 ? (
            <Statistic
              title="Total"
              prefix="$"
              groupSeparator="."
              valueStyle={{ color: "#07bc0c" }}
              value={totalAfterDiscount}
              suffix={
                <Typography.Text delete type="danger" style={{ fontSize: 16 }}>
                  {total}
                </Typography.Text>
              }
            />
          ) : (
            <Statistic title="Total" prefix="$" groupSeparator="." value={total} />
          )
        }
      />

      <Space size={24}>
        {COD ? (
          <Button size="large" type="primary" loading={loading} onClick={createCashOrder} disabled={disabled || !products.length} style={{ width: 160 }}>
            Place Order
          </Button>
        ) : (
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={() => history.push("/payment")}
            disabled={disabled || !products.length}
            style={{ width: 160 }}
          >
            Place Order
          </Button>
        )}
        <Popconfirm title={<p>Sure to empty cart ?</p>} placement="topRight" okText={<BsCheckLg />} cancelText={<BsXLg />} onConfirm={() => emptyCart()}>
          <Button size="large" type="text" disabled={!products.length}>
            Empty Cart
          </Button>
        </Popconfirm>
      </Space>
    </Card>
  );
}

export default CheckoutSummary;
