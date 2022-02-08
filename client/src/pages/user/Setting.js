import React from "react";

import { Layout, Row, Col, Space } from "antd";

import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import PasswordUpdateForm from "../../components/form/PasswordUpdateForm";
import AddressForm from "../../components/form/AddressForm";

function Setting() {
  return (
    <Layout.Content>
      <Row gutter={[24, 24]}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Space size={24} direction="vertical">
            <AddressForm />
            <PasswordUpdateForm />
          </Space>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Setting;
