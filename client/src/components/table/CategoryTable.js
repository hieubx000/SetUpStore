import React from "react";
import { Link } from "react-router-dom";

import { Table, Button, Typography, Space, Popconfirm, Avatar, Image } from "antd";
import { formatFromNow, formatDate, sorterByDate } from "../../common/utils";

import { BsTrash, BsThreeDots, BsCheckLg, BsXLg } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

function CategoryTable({ data, handleRemove }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar size={48} src={<Image src={record.image} width={48} height={48} />} />
          <Typography.Text>{text}</Typography.Text>
        </Space>
      ),
      sorter: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 170,
      render: (text) => <Typography.Text>{formatFromNow(text)}</Typography.Text>,
      sorter: (a, b) => sorterByDate("updatedAt")(a, b),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 170,
      render: (text) => <Typography.Text>{formatDate(text)}</Typography.Text>,
      sorter: (a, b) => sorterByDate("createdAt")(a, b),
    },
    {
      title: <BsThreeDots size={24} />,
      dataIndex: "",
      key: "action",
      width: 170,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/category/${record.slug}`}>
            <Button size="large" type="text" icon={<BiEdit />}></Button>
          </Link>
          <Popconfirm
            title={
              <p>
                Sure to delete <b>{record.name}</b> ?
              </p>
            }
            placement="topRight"
            okText={<BsCheckLg />}
            cancelText={<BsXLg />}
            onConfirm={() => handleRemove(record.slug)}
          >
            <Button size="large" type="text" danger icon={<BsTrash />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      title={() => ""}
      footer={() => (
        <p style={{ position: "absolute" }}>
          Total <b>{data.length}</b> items
        </p>
      )}
      rowKey={(record) => record._id}
      dataSource={data}
    />
  );
}

export default CategoryTable;
