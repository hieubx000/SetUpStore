import React from "react";
import { useSelector } from "react-redux";
import { Typography, Steps, Row, Card, Col } from "antd";

function CheckoutSteps({ current }) {
  const { cart } = useSelector((state) => ({ ...state }));

  const renderDesc = () => (
    <p>
      <Typography.Link>{cart.length}</Typography.Link> products
    </p>
  );

  return (
    <Row style={{ marginBottom: 24 }}>
      <Col span={24}>
        <Card bordered={false}>
          <Steps current={current} style={{ marginBottom: -24 }}>
            <Steps.Step title="Cart" description={renderDesc()} />
            <Steps.Step title="Checkout" description={renderDesc()} />
            <Steps.Step title="Final" description={renderDesc()} />
          </Steps>
        </Card>
      </Col>
    </Row>
  );
}

export default CheckoutSteps;
