import React from "react";

import { Layout, Row, Col } from "antd";

import Footer from "../components/nav/Footer";
import CategoryList from "../components/list/CategoryList";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

function Home() {
  return (
    <>
      <Layout.Content>
        <Row gutter={[0, 24]} style={{ width: "100%", minWidth: "100%" }}>
          <Col span={24}>
            <CategoryList />
          </Col>
          <Col span={24}>
            <BestSellers />
          </Col>
          <Col span={24}>
            <NewArrivals />
          </Col>
        </Row>
      </Layout.Content>
      <Footer />
    </>
  );
}
export default Home;
