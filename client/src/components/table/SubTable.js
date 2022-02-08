import React from "react";
import { Link } from "react-router-dom";

import { Table, Button, Typography, Space, Popconfirm, Avatar, Image } from "antd";
import { formatFromNow, formatDate, sorterByDate } from "../../common/utils";

import { BsTrash, BsThreeDots, BsCheckLg, BsXLg } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

function SubTable({ categories, data, handleRemove }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (text, record) => (
        <Space>
          <Avatar size={48} src={<Image src={record.image} width={48} height={48} />} />
          <Typography.Text>{text}</Typography.Text>
        </Space>
      ),
      sorter: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
    },
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
      width: 200,
      ellipsis: true,
      render: (text) => <Typography.Text>{text.name}</Typography.Text>,
      filters: [...categories.map((item) => ({ value: item._id, text: item.name }))],
      onFilter: (value, record) => record.parent._id.includes(value),
      sorter: (a, b) => (a.parent.name > b.parent.name ? 1 : b.parent.name > a.parent.name ? -1 : 0),
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
          <Link to={`/admin/sub/${record.slug}`}>
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

export default SubTable;
