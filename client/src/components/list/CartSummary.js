import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Row, Button, Statistic, List, Card, Space } from "antd";

function CartSummary({loading, saveOrderToDb, saveCashOrderToDb}) {
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <Card>
      <Typography.Title level={3}>Order Summary</Typography.Title>
      <List
        itemLayout="vertical"
        loading={loading}
        dataSource={cart}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Row justify="space-between">
              <Typography.Text>
                {item.name} x <b>{item.count}</b>
              </Typography.Text>
              <Typography.Text>
                <b>${item.price * item.count}</b>
              </Typography.Text>
            </Row>
          </List.Item>
        )}
        header={<div>Products</div>}
        footer={<Statistic title="Total" prefix="$" groupSeparator="." value={getTotal()} />}
      />
      {user ? (
        <Space direction="vertical">
          <Button size="large" type="primary" loading={loading} onClick={saveOrderToDb} disabled={loading || !cart.length}>
            Proceed to Checkout
          </Button>
          <Button onClick={saveCashOrderToDb} size="large" type="link" disabled={loading || !cart.length}>
            Pay Cash on Delivery
          </Button>
        </Space>
      ) : (
        <Link
          to={{
            pathname: "/login",
            state: { from: "cart" },
          }}
        >
          <Button size="large" type="primary">
            Login to Checkout
          </Button>
        </Link>
      )}
    </Card>
  )
}

export default CartSummary
