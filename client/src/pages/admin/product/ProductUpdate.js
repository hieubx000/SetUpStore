import React from "react";
import { useSelector } from "react-redux";

import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card} from "antd";

import Loader from "../../../components/loader/Loader";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import ProductUpdateForm from "../../../components/form/ProductUpdateForm";

const initialState = {
  name: "",
  desc: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  color: "",
  brand: "",
};

function ProductUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();
  const { slug } = match.params;

  const [values, setValues] = React.useState(initialState);
  const [categories, setCategories] = React.useState([]);
  const [subOptions, setSubOptions] = React.useState([]);
  const [arrayOfSubs, setArrayOfSubs] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.forEach((s) => arr.push(s._id));
      setArrayOfSubs((prev) => arr);
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const handleUpdate = (values) => {
    setLoading(true);
    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        console.log(values);
        toast.success(`"${res.data.name}" is updated`);
        history.replace("/admin/products")
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleCategoryChange = (value) => {
    setValues({ ...values, subs: [] });

    setSelectedCategory(value);

    getCategorySubs(value).then((res) => {
      setSubOptions(res.data);
    });
    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
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
            <ProductUpdateForm
              form={form}
              values={values}
              onFinish={handleUpdate}
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              arrayOfSubs={arrayOfSubs}
              setArrayOfSubs={setArrayOfSubs}
              selectedCategory={selectedCategory}
              setLoading={setLoading}
            />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default ProductUpdate;
