import React from "react";
import { Statistic, Space, Divider, Typography, Row, Button } from "antd";

import { setColor } from "../../common/utils";
import OrderDetail from "./OrderDetail";
import { BsFillPrinterFill } from "react-icons/bs";

const ShowPaymentInfo = ({ order }) => {
  const [visible, setVisible] = React.useState(false);

  const renderOrderSummary = () => (
    <Space split={<Divider type="vertical" />}>
      <span>Order Id: {order.paymentIntent.id}</span>
      <Space>
        Amount: <Statistic valueStyle={{ fontSize: 18 }} value={order.paymentIntent.amount / 100} groupSeparator="." prefix="$" />
      </Space>
      <Space>
        STATUS:
        <Typography.Text strong type={setColor(order.orderStatus)}>
          {order.orderStatus}
        </Typography.Text>
      </Space>
    </Space>
  );

  const renderButtons = () => (
    <Space>
      <Button
        size="large"
        type="text"
        style={{ gap: 4 }}
        onClick={() => {
          setVisible(true);
        }}
      >
        Detail
      </Button>
      <Button size="large" type="text" style={{ gap: 4 }} icon={<BsFillPrinterFill />}>
        PDF
      </Button>
    </Space>
  );

  return (
    <Row justify="space-between">
      {renderOrderSummary()}
      {renderButtons()}
      <OrderDetail order={order} visible={visible} setVisible={setVisible} />
    </Row>
  );
};

export default ShowPaymentInfo;
