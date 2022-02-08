import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Avatar, Typography, Space, Progress, Statistic, Rate, Divider, Tag, Tooltip } from "antd";
function ProductListItems({ product }) {
  const { name, desc, price, category, subs, shipping, color, brand, quantity, sold } = product;

  const renderDetail = (col1, col2) => {
    return (
      <Row gutter={[24, 24]} wrap={false}>
        <Col span={8}>{col1}</Col>
        <Col span={12}>{col2}</Col>
      </Row>
    );
  };

  return (
    <Space size={14} direction="vertical">
      <Space>
        <Typography.Title level={2}>{name}</Typography.Title>
        <Typography.Text type="secondary" ellipsis style={{ maxWidth: 240 }}>
          {brand}
        </Typography.Text>
      </Space>
      <Typography.Paragraph style={{ margin: 0 }}>{desc}</Typography.Paragraph>

      {renderDetail(<Typography.Text>Category</Typography.Text>, category && <Link to={`/category/${category.slug}`}>{category.name}</Link>)}
      {renderDetail(
        <Typography.Text>Sub Categories</Typography.Text>,
        subs && (
          <Space size={24}>
            {subs.map((s) => (
              <Link key={s._id} to={`/sub/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </Space>
        )
      )}
      {renderDetail(
        <Typography.Text>Shipping</Typography.Text>,
        shipping && <Tag color={shipping.toLowerCase() === "yes" ? "success" : "error"}>{shipping}</Tag>
      )}
      {renderDetail(<Typography.Text>Color</Typography.Text>, color && <Tag color={color.toLowerCase() !== "white" && color.toLowerCase()}>{color}</Tag>)}
      {renderDetail(<Typography.Text>Brand</Typography.Text>, <Typography.Text>{brand}</Typography.Text>)}
      {renderDetail(
        <Typography.Text>Sold</Typography.Text>,
        <Tooltip
          placement="topRight"
          title={
            <Statistic
              groupSeparator="."
              value={sold}
              valueStyle={{ fontSize: 16, color: "#fff" }}
              suffix={<Typography.Text style={{ fontSize: 14, color: "#eee" }}> of {quantity + sold}</Typography.Text>}
            />
          }
        >
          <Progress
            strokeColor={{
              from: "#f56766",
              to: "#faad14",
            }}
            percent={((sold / (quantity + sold)) * 100).toFixed(2)}
            strokeWidth={12}
            showInfo={false}
            status="active"
          />
        </Tooltip>
      )}
      <Space split={<Divider type="vertical" />} size={24}>
        <Space direction="vertical">
          <Rate disabled allowHalf defaultValue={2.5} />
          <Avatar.Group maxCount={5} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>A</Avatar>
            <Avatar style={{ backgroundColor: "#87d068" }}>B</Avatar>
            <Avatar style={{ backgroundColor: "#1890ff" }}>C</Avatar>
            <Avatar style={{ backgroundColor: "#f56a01" }}>D</Avatar>
            <Avatar style={{ backgroundColor: "#f46a01" }}>E</Avatar>
          </Avatar.Group>
        </Space>
        <Statistic
          title="Sold"
          groupSeparator="."
          valueStyle={{ fontSize: 24 }}
          value={sold}
          suffix={<Typography.Text style={{ fontSize: 16 }}> of {quantity + sold}</Typography.Text>}
        />
        <Statistic title="Price" groupSeparator="." value={price} prefix="$" />
        {/* {renderStatus()} */}
      </Space>
    </Space>
  );
}

export default ProductListItems;
