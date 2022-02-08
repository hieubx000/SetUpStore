import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../common/firebase";

import { toast } from "react-toastify";
import { Form, Input, Layout, Button, Typography, Row, Col } from "antd";

import { HiOutlineMail } from "react-icons/hi";

import Loader from "../../components/loader/Loader";
import Gallery from "./Gallery";

function ForgotPassword({ history }) {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const handleSubmit = async ({ email }) => {
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        form.resetFields();
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };
  const ForgotPasswordForm = () => (
    <Form form={form} name="form-container" size="large" layout="vertical" onFinish={handleSubmit} requiredMark={false}>
      <Typography.Title>Forgot Password</Typography.Title>
      <Typography.Title level={5} type="secondary">
        Just one more step
      </Typography.Title>
      <Form.Item name="email" rules={[{ required: true }]}>
        <Input prefix={<HiOutlineMail size={24} />} placeholder="Enter your email..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout.Content>
      {loading ? <Loader /> : ""}
      <Row wrap={false} gutter={[54, 48]}>
        <Col flex="480px">
          {ForgotPasswordForm()}
          <p style={{ textAlign: "right" }}>
            <Link to="/login">Back to login</Link>
          </p>
        </Col>
        <Col flex="auto">
          <Gallery />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default ForgotPassword;
