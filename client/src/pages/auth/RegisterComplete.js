import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Form, Input, Button, Typography, Row, Col, Layout } from "antd";

import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

import { auth } from "../../common/firebase";
import { createOrUpdateUser } from "../../functions/auth";

import Gallery from "./Gallery";

function RegisterComplete({ history }) {
  const [form] = Form.useForm();

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  React.useEffect(() => {
    form.setFieldsValue({ email: window.localStorage.getItem("emailForRegistration") });
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, [form]);

  const handleSubmit = async ({ email, password }) => {
    try {
      if (!email || !password) throw new Error("Email and password is required");
      if (password.length < 6) throw new Error("Password must be at least 6 characters long");

      const result = await auth.signInWithEmailLink(email, window.location.href);
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                area: res.data.area,
                address: res.data.address,
                role: res.data.role,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // redirect
        history.replace("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <Form form={form} name="form-container" onFinish={handleSubmit} size="large" layout="vertical" requiredMark={false}>
      <Typography.Title>Register Complete</Typography.Title>
      <Typography.Title level={5} type="secondary">
        The last step
      </Typography.Title>
      <Form.Item name="email" rules={[{ required: true }]}>
        <Input prefix={<HiOutlineMail size={24} />} disabled />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password prefix={<HiOutlineLockClosed size={24} />} type="password" placeholder="Enter your password..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Complete Registration
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout.Content>
      <Row wrap={false} gutter={[54, 48]}>
        <Col flex="480px">{completeRegistrationForm()}</Col>
        <Col flex="auto">
          <Gallery />
        </Col>
      </Row>
    </Layout.Content>
  );
}
export default RegisterComplete;
