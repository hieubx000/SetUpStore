import React from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card, Typography, Space, Button, Input, InputNumber } from "antd";
import DatePicker from "../../../components/form/DatePicker";
import * as dayjs from "dayjs";

import { BsArrowReturnRight } from "react-icons/bs";

import { getCoupons, removeCoupon, createCoupon } from "../../../functions/coupon";
import Loader from "../../../components/loader/Loader";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import CouponTable from "../../../components/table/CouponTable";

function CouponPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [coupons, setCoupons] = React.useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleCreate = ({ name, discount, expiry }) => {
    // console.log(name, expiry.format(), discount);
    setLoading(true);
    createCoupon({ name, expiry: expiry.format(), discount }, user.token)
      .then((res) => {
        setLoading(false);
        form.resetFields();
        toast.success(`"${res.data.name}" is created`);
        loadAllCoupons();
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    setLoading(true);
    removeCoupon(couponId, user.token)
      .then((res) => {
        loadAllCoupons(); // load all coupons
        setLoading(false);
        toast.error(`Coupon "${res.data.name}" deleted`);
      })
      .catch((err) => console.log(err));
  };

  const renderFormTitle = () => {
    return (
      <Space size="small" align="start">
        <Typography.Title level={4}>{"Create new coupon"}</Typography.Title>
      </Space>
    );
  };
  const renderForm = () => {
    return (
      <Form form={form} onFinish={handleCreate} layout="inline" requiredMark={false} size="large">
        <Form.Item name="name" rules={[{ required: true, message: "Please input coupon!" }]}>
          <Input placeholder="Enter coupon name..." autoFocus prefix={<BsArrowReturnRight />} />
        </Form.Item>
        <Form.Item name="discount" initialValue={20} rules={[{ required: true, message: "Please input discount!" }]}>
          <InputNumber
            placeholder="Enter discount..."
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            style={{ width: 240 }}
          />
        </Form.Item>
        <Form.Item name="expiry" initialValue={dayjs()} rules={[{ required: true, message: "Please choose expiry date!" }]}>
          <DatePicker
            placeholder="Enter expiry date..."
            mode="date"
            format="DD/MM/YYYY"
            size="large"
            disabledDate={(current) => current && dayjs(current) < dayjs().subtract(1, "day")}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {"Add"}
            </Button>
            <Button type="text" htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout.Content>
      {loading ? <Loader /> : ""}
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card style={{ marginBottom: 24 }}>
            {renderFormTitle()}
            {renderForm()}
          </Card>
          <Card>
            <CouponTable data={coupons} handleRemove={handleRemove} />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CouponPage;
