import React from "react";

import { Table, Typography, Space, Avatar, Tag, Statistic } from "antd";

import { colors } from "../../common/constant";

function OrderDetailTable({ data }) {
  const columns = [
    {
      title: "Image",
      dataIndex: ["product", "images"],
      key: "images",
      render: (text, record) => (
        <Space>
          <Avatar shape="square" size={100} src={text[0].url} alt={text[0].public_id} key={text[0].public_id} />
          <Typography.Text>{record.product.name}</Typography.Text>
        </Space>
      ),
      sorter: (a, b) => (a.product.name > b.product.name ? 1 : b.product.name > a.product.name ? -1 : 0),
    },
    {
      title: "Brand",
      dataIndex: ["product", "brand"],
      key: "brand",
      width: 220,
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Price",
      dataIndex: ["product", "price"],
      key: "price",
      width: 120,
      render: (text) => <Statistic value={text} groupSeparator="." prefix="$"></Statistic>,

      sorter: (a, b) => a.product.price - b.product.price,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      width: 120,
      render: (text) => <Typography.Text>{text}</Typography.Text>,

      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 120,
      render: (text) => <Tag color={text.toLowerCase() !== "white" && text.toLowerCase()}>{text}</Tag>,
      filters: [...colors.map((c) => ({ text: c, value: c }))],
      onFilter: (value, record) => record.color === value,
    },
    {
      title: "Shipping",
      dataIndex: ["product", "shipping"],
      key: "shipping",
      width: 120,
      render: (text) => <Tag color={text.toLowerCase() === "yes" ? "success" : "error"}>{text}</Tag>,
    },
  ];

  return (
    <Table
      columns={columns}
      footer={() => ""}
      rowKey={(record) => record._id}
      dataSource={data}
      pagination={{
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
    />
  );
}

export default OrderDetailTable;
