import React from "react";
import { useSelector } from "react-redux";

import { Avatar, Row, Col, Typography, Card, Button } from "antd";

function Profile() {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    // <Card cover={<img alt="example" height={100} src="https://source.unsplash.com/random?setup%20desk" />}>
    <Card style={{ marginBottom: 24 }}>
      <Row align="middle" wrap={false}>
        <Col flex="none">
          <Button size="large" shape="circle" style={{ height: 110, width: 110, padding: 2 }}>
            <Avatar size={100} src={user.picture} />
          </Button>
        </Col>
        <Col flex="auto" style={{ paddingLeft: 10 }}>
          <Row>
            <Typography.Title level={3} style={{ width: 150 }} ellipsis>
              {user.name}
            </Typography.Title>
          </Row>
          <Row>
            <Typography.Text style={{ width: 150 }} ellipsis>
              {user.email}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default Profile;
