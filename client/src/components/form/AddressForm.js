import React from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Typography, Button, Form, Input, Select, Card, Space } from "antd";

import { areas } from "../../common/constant";
import { vietnameseSlug } from "../../common/utils";
import { saveUserAddress } from "../../functions/user";

function AddressForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const saveAddressToDb = ({ area, address }) => {
    // console.log(area, address);
    setLoading(true);
    saveUserAddress(user.token, area, address).then((res) => {
      if (res.data.ok) {
        toast.success("Address saved");
        setLoading(false);
      }
    });
  };

  return (
    <Card>
      <Typography.Title level={3}>Delivery Address</Typography.Title>
      <Form
        form={form}
        size="large"
        layout="vertical"
        requiredMark={false}
        onFinish={saveAddressToDb}
        initialValues={{ area: user.area, address: user.address }}
      >
        <Form.Item name="area" label="Area" colon={false} rules={[{ required: true }]}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => vietnameseSlug(option.children, " ").indexOf(vietnameseSlug(input, " ")) >= 0}
            placeholder="Select your area ..."
          >
            {areas.map((item) => (
              <Select.Option key={vietnameseSlug(item)} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="address" label="Detail Address" colon={false} rules={[{ required: true }]}>
          <Input.TextArea showCount maxLength={300} placeholder="Enter your address ..." />
        </Form.Item>
        <Form.Item>
          <Space size={24}>
            <Button size="large" type="primary" htmlType="submit" loading={loading} style={{ width: 160 }}>
              Save
            </Button>
            <Button size="large" type="text" htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddressForm;
