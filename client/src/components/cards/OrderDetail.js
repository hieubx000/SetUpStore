import React from "react";
import { useSelector } from "react-redux";
import { Statistic, Space, Steps, Row, Col, Button, PageHeader, Descriptions, Modal, Tag, Typography } from "antd";

import { formatDate, formatFromNow, isSameTime } from "../../common/utils";
import { orderStatus } from "../../common/constant";
import OrderDetailTable from "../table/OrderDetailTable";

import { BsFillPrinterFill } from "react-icons/bs";

function OrderDetail({ order, visible, setVisible }) {
  const { user } = useSelector((state) => ({ ...state }));

  const setTagColor = (status) => {
    if (status === "Cancelled") return "error";
    if (status === "Processing" || status === "Dispatched") return "warning";
    if (status === "Completed") return "success";
  };

  const total = order.products.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.product.price;
  }, 0);

  const totalAfterDiscount = order.paymentIntent.amount / 100;

  const renderSteps = (status) => {
    const current = orderStatus.indexOf(status);
    return (
      <Steps size="small" current={current} responsive={false}>
        <Steps.Step title="Not Processed" />
        <Steps.Step title="Processing" />
        <Steps.Step title="Dispatched" />
        {status === "Cancelled" ? <Steps.Step status="error" title="Cancelled" /> : <Steps.Step title="Completed" />}
      </Steps>
    );
  };
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const renderContent = (column = 3) => (
    <Descriptions size="default" column={column}>
      <Descriptions.Item span={1} label="Ordered by">
        {order.orderedBy.name ?? user.name}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Ordered on">
        {formatDate(order.paymentIntent.created * 1000, "DD/MM/YYYY HH:mm:ss")}
      </Descriptions.Item>
      <Descriptions.Item label="Delivery to" span={3}>
        <b>{order.orderedBy.area ?? user.area}</b>, {order.orderedBy.address ?? user.address}
      </Descriptions.Item>
      <Descriptions.Item label="Payment">{capitalizeFirstLetter(order.paymentIntent.status)}</Descriptions.Item>
      <Descriptions.Item label="Method">{capitalizeFirstLetter(order.paymentIntent.payment_method_types[0])}</Descriptions.Item>
      <Descriptions.Item label="Currency">{order.paymentIntent.currency.toUpperCase()}</Descriptions.Item>
    </Descriptions>
  );
  const extraContent = (
    <Space size={48} direction="vertical" style={{ width: 120 }}>
      {totalAfterDiscount - total < 0 ? (
        <Statistic
          title="Total"
          prefix="$"
          groupSeparator="."
          valueStyle={{ color: "#07bc0c" }}
          value={order.paymentIntent.amount / 100}
          suffix={
            <Typography.Text delete type="danger" style={{ fontSize: 16 }}>
              {total}
            </Typography.Text>
          }
        />
      ) : (
        <Statistic title="Total amount" value={order.paymentIntent.amount / 100} valueStyle={{ color: "#07bc0c" }} groupSeparator="." prefix="$" />
      )}
    </Space>
  );

  const Content = ({ children, extra }) => (
    <Space size={24} align="start">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </Space>
  );

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      width={1140}
      style={{ top: 24 }}
      title={
        <p style={{ margin: 0 }}>
          Detail <b>{order.paymentIntent.id}</b>
        </p>
      }
    >
      <PageHeader
        style={{ padding: 0, marginBottom: 24 }}
        onBack={() => setVisible(false)}
        title={order.paymentIntent.id}
        footer={() => ""}
        avatar={{ size: 54, src: order.orderedBy.picture ?? user.picture }}
        tags={
          <Space split={"-"}>
            <Tag color={setTagColor(order.orderStatus)}>{order.orderStatus}</Tag>
            {!isSameTime(order.updatedAt, order.createdAt) && <Typography.Text type="secondary">{formatFromNow(order.updatedAt)}</Typography.Text>}
          </Space>
        }
        extra={[
          <Space key="controls">
            <Button type="text" size="large">
              Update
            </Button>
            <Button size="large" type="primary" style={{ gap: 4 }} icon={<BsFillPrinterFill />}>
              PDF
            </Button>
          </Space>,
        ]}
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
      <Row gutter={[24, 24]}>
        <Col span={24}>{renderSteps(order.orderStatus)}</Col>
        <Col span={24}>
          <OrderDetailTable data={order.products} />
        </Col>
      </Row>
    </Modal>
  );
}

export default OrderDetail;
