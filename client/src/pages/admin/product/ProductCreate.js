import React from "react";
import { useSelector } from "react-redux";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card} from "antd";

import Loader from "../../../components/loader/Loader";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import ProductCreateForm from "../../../components/form/ProductCreateForm";

function ProductCreate({ history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  const [categories, setCategories] = React.useState([]);
  const [subOptions, setSubOptions] = React.useState([]);
  const [showSub, setShowSub] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadCategories = () => getCategories().then((c) => setCategories(c.data));
    loadCategories();
  }, []);

  const handleCreate = (values) => {
    createProduct(values, user.token)
      .then((res) => {
        toast.success(`"${res.data.name}" is created`);
        form.resetFields();
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleCategoryChange = (value) => {
    getCategorySubs(value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
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
          <Card>
            <ProductCreateForm
              form={form}
              onFinish={handleCreate}
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              showSub={showSub}
              subOptions={subOptions}
              setLoading={setLoading}
            />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default ProductCreate;
