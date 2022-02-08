import React from "react";

import { Typography, Button, Form, Input, Card } from "antd";
import { RiCouponLine } from "react-icons/ri";

function CouponApplyForm({ loading, disabled, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Card style={{ backgroundColor: "rgba(245, 103, 102, 0.02)", marginTop: 24, maxWidth: 320 }}>
      <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
        <Typography.Title level={4}>Got Coupon?</Typography.Title>
        <Form.Item name="coupon" style={{ margin: 0 }}>
          <Input
            placeholder="Enter coupon..."
            style={{ padding: "5px 5px 5px 10px" }}
            allowClear
            prefix={<RiCouponLine size={24} />}
            suffix={
              <Button loading={loading} type="primary" htmlType="submit" disabled={disabled}>
                Apply
              </Button>
            }
          />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CouponApplyForm;
