import React from "react";

import { Table, Typography, Space, Row, Col, Avatar, Select, Statistic } from "antd";

import { formatDate, sorterByDate } from "../../common/utils";
import { orderStatus } from "../../common/constant";
import OrderProductsList from "../list/OrderProductsList";
import OrderDetail from "../cards/OrderDetail";

function OrderTable({ loading, data, handleStatusChange }) {
  const [visible, setVisible] = React.useState(false);
  const [orderData, setOrderData] = React.useState("");

  const columns = [
    {
      title: "Ordered",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (text) => (
        <Space>
          <Avatar size="large" shape="circle" src={text.picture} key={text._id} />
          <Typography.Text>{text.name}</Typography.Text>
        </Space>
      ),
      // sorter: (a, b) => (a.orderedBy.name > b.orderedBy.name ? 1 : b.orderedBy.name > a.orderedBy.name ? -1 : 0),
    },
    {
      title: "OrderId",
      dataIndex: ["paymentIntent", "id"],
      key: "id",
      width: 280,
      ellipsis: true,
      render: (text, record) => (
        <Typography.Text
          ellipsis
          strong
          onClick={() => {
            setVisible(true);
            setOrderData(record);
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "CreatedAt",
      dataIndex: ["paymentIntent", "created"],
      key: "create",
      width: 160,
      render: (text) => <Typography.Text>{formatDate(text * 1000, "DD/MM/YYYY HH:mm:ss")}</Typography.Text>,
      sorter: (a, b) => sorterByDate("createdAt")(a, b),
    },
    {
      title: "Total$$",
      dataIndex: ["paymentIntent", "amount"],
      key: "amount",
      width: 120,
      render: (text) => <Statistic valueStyle={{ fontSize: 18 }} value={text / 100} groupSeparator="." prefix="$" />,
      sorter: (a, b) => a.paymentIntent.amount - b.paymentIntent.amount,
    },
    {
      title: "Delivery Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 200,
      render: (text, record) => (
        <Select onSelect={(value) => handleStatusChange(record._id, value)} value={text} placeholder="Select status.." style={{ width: "100%" }}>
          {orderStatus.map((item) => (
            <Select.Option value={item}>{item}</Select.Option>
          ))}
        </Select>
      ),
      filters: [...orderStatus.map((item) => ({ text: item, value: item }))],
      onFilter: (value, record) => record.orderStatus === value,
    },
  ];

  return (
    <>
      {orderData && <OrderDetail order={orderData} visible={visible} setVisible={setVisible} />}
      <Table
        loading={loading}
        columns={columns}
        title={() => ""}
        footer={() => ""}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={{
          position: ["topRight"],
          total: data.length,
          showTotal: (total) => (
            <p style={{ marginRight: 16 }}>
              Total <b>{total}</b> items
            </p>
          ),
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "50"],
        }}
        expandable={{
          expandedRowRender: (record) => (
            <Row justify="end">
              <Col style={{ paddingLeft: 12 }} span={23}>
                <OrderProductsList loading={loading} order={record} />
              </Col>
            </Row>
          ),
        }}
      />
    </>
  );
}

export default OrderTable;
