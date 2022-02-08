import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Space, Button, Typography } from "antd";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import BannerCoupon from "../home/BannerCoupon";

function Footer() {
  return (
    <>
      <Row justify="center" style={{ marginBottom: 24 }}>
        <BannerCoupon />
      </Row>
      <Layout.Footer style={{ backgroundColor: "#222", padding: "32px 16px 32px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <Row justify="space-between" style={{ borderBottom: "1px solid #7d8492", paddingBottom: 24, marginBottom: 24 }}>
            <Space style={{ height: 50 }} align="start">
              <Link to="#">
                <img
                  height={50}
                  src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"
                  alt=""
                />
              </Link>
              <Link to="/" style={{ fontSize: 28, fontWeight: "bold" }}>
                SetUpStore
              </Link>
            </Space>
            <Space size={24} style={{ color: "#e6e6e6", fontWeight: "bold" }}>
              <Link to="#">
                <FaFacebookF />
              </Link>
              <Link to="#">
                <FaTwitter />
              </Link>
              <Link to="#">
                <FaGoogle />
              </Link>
            </Space>
          </Row>
        </div>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <Row justify="space-between">
            <Space size={24} style={{ color: "#e6e6e6" }}>
              <Link to="#">Autonomous</Link>
              <Link to="#">Shop Online</Link>
              <Link to="#">Get In Touch</Link>
            </Space>
            <Typography.Text style={{ color: "#e6e6e6" }}>
              © <b>Web54 team</b>
            </Typography.Text>
          </Row>
        </div>
      </Layout.Footer>
    </>
  );
}

export default Footer;
