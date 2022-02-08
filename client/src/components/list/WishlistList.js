import React from "react";
import { Link } from "react-router-dom";

import { List, Popconfirm, Button, Typography, Space, Avatar, Progress, Tag, Tooltip, Statistic } from "antd";
import { BsTrash, BsCheckLg, BsXLg } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

function WishlistList({ loading, wishlist, handleRemove }) {
  const renderDeleteButton = (item) => (
    <Popconfirm
      title={
        <p>
          Sure to remove <b>{item.name}</b>?
        </p>
      }
      placement="topRight"
      okText={<BsCheckLg />}
      cancelText={<BsXLg />}
      onConfirm={() => handleRemove(item._id)}
    >
      <Button size="large" type="text" danger icon={<BsTrash />}></Button>
    </Popconfirm>
  );

  const renderTitle = (item) => (
    <Space>
      <Link to={`/product/${item.slug}`}>{item.name}</Link>{" "}
      <Tag color="volcano" icon={<FaHeart />} style={{ padding: "4px 8px", border: 0, display: "flex", alignItems: "center", gap: 4 }}>
        {item.wishlist.length}
      </Tag>
    </Space>
  );

  const renderProgress = (item) => (
    <Tooltip
      placement="topRight"
      title={
        <Statistic
          groupSeparator="."
          value={item.sold}
          valueStyle={{ fontSize: 16, color: "#fff" }}
          suffix={<Typography.Text style={{ fontSize: 14, color: "#eee" }}> of {item.quantity + item.sold}</Typography.Text>}
        />
      }
    >
      <Progress
        strokeColor={{
          from: "#f56766",
          to: "#faad14",
        }}
        percent={((item.sold / (item.quantity + item.sold)) * 100).toFixed(2)}
        strokeWidth={12}
        showInfo={false}
        status="active"
      />
    </Tooltip>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      // pagination={{
      //   pageSize: 10,
      //   defaultPageSize: 10,
      //   showSizeChanger: true,
      //   pageSizeOptions: ["10", "20", "30", "50"],
      // }}
      pagination={false}
      loading={loading}
      dataSource={wishlist}
      renderItem={(item) => (
        <List.Item extra={renderDeleteButton(item)}>
          <List.Item.Meta
            avatar={<Avatar size={100} shape="square" src={item.images && item.images.length ? item.images[0].url : ""} />}
            title={renderTitle(item)}
            description={
              <Space direction="vertical">
                <Typography.Text ellipsis style={{ maxWidth: 480 }}>
                  {item.desc}
                </Typography.Text>
                {renderProgress(item)}
              </Space>
            }
            style={{ marginBottom: 0 }}
          />
        </List.Item>
      )}
    />
  );
}

export default WishlistList;
