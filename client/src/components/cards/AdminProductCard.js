import React from "react";
import { Link } from "react-router-dom";

import { Card, Col, Popconfirm, Typography, Image, Space, Button, Row, Tag, Badge } from "antd";
import { ImFire } from "react-icons/im";

import { BsCheckLg, BsXLg, BsSearch } from "react-icons/bs";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

function AdminProductCard({ product, handleRemove }) {
  // const [visible, setVisible] = React.useState(false);
  const { name, desc, images, slug } = product;
  const renderBadgeStatus = () => {
    if (product.quantity < 1) return <Tag color="error">Out of stock</Tag>;
    else if (product.sold / (product.quantity + product.sold) > 0.8)
      return (
        <Tag icon={<ImFire />} color="success">
          Trending
        </Tag>
      );
  };

  const renderThumbnail = () => (
    <Badge offset={[-24, 0]} count={renderBadgeStatus()}>
      <Image
        alt={slug}
        height={150}
        width={"100%"}
        style={{ borderRadius: 4 }}
        src={images && images.length ? images[0].url : "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
        preview={{
          visible: false,
          mask: (
            <Space size={16}>
              <Link to={`/product/${slug}`}>
                <Button type="primary" shape="circle" size="large" icon={<FaRegEye />}></Button>
              </Link>
            </Space>
          ),
        }}
      />
    </Badge>
  );

  const renderContent = () => (
    <Space direction="vertical">
      <Typography.Title level={4} style={{ maxWidth: 220, marginBottom: 0 }} ellipsis>
        {name}
      </Typography.Title>
      <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ maxWidth: 240, marginBottom: 0 }}>
        {desc}
      </Typography.Paragraph>
      <Row justify="space-between">
        <Link to={`/admin/product/${slug}`}>
          <Button icon={<BiEdit />} style={{ width: 80 }} type="primary"></Button>
        </Link>
        <Popconfirm
          title={
            <p>
              Sure to delete <b>{name}</b> ?
            </p>
          }
          placement="topRight"
          okText={<BsCheckLg />}
          cancelText={<BsXLg />}
          onConfirm={() => handleRemove(slug)}
        >
          <Button icon={<BiTrash />} type="text" danger style={{ width: 80 }}></Button>
        </Popconfirm>
      </Row>
    </Space>
  );

  return (
    <Col sm={12} lg={8} xl={6} xxl={6}>
      <Card bordered={false} size="small" cover={renderThumbnail()}>
        {renderContent()}
      </Card>
    </Col>
  );
}

export default AdminProductCard;
