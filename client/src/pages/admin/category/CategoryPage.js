import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createCategory, getCategories, removeCategory, getCategory, updateCategory } from "../../../functions/category";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card, Typography, Space, Tooltip, Button, Input } from "antd";

import Loader from "../../../components/loader/Loader";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import LocalSearch from "../../../components/form/LocalSearch";
import CategoryTable from "../../../components/table/CategoryTable";

import { BsArrowReturnRight, BsBackspaceReverse, BsFillImageFill } from "react-icons/bs";

function CategoryPage({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const slug = match.params.slug;

  React.useEffect(() => {
    loadCategories();
  }, []);

  React.useEffect(() => {
    if (slug) {
      const loadCategory = () =>
        getCategory(slug).then((res) => {
          setCategory(res.data.category);
          form.setFieldsValue({ name: res.data.category.name, image: res.data.category.image });
        });
      loadCategory();
    } else {
      loadCategories();
    }
  }, [form, slug]);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const handleCreate = ({ name, image }) => {
    // console.log(name);
    setLoading(true);
    createCategory({ name, image }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        toast.success(`"${res.data.name}" is created`);
        form.resetFields();
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // console.log(answer, slug);
    setLoading(true);
    removeCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        history.replace("/admin/category");
        form.resetFields();
        loadCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  const handleEdit = ({ name, image }) => {
    // console.log(name);
    setLoading(true);
    updateCategory(slug, { name, image }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        form.resetFields();
        toast.success(`"${res.data.name}" is updated`);
        history.replace("/admin/category");
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const renderFormTitle = () => {
    return (
      <Space size="small" align="start">
        <Typography.Title level={4}>{slug ? `Update ${category.name}` : "Create new category"}</Typography.Title>
        {slug ? (
          <Link to="/admin/category">
            <Tooltip placement="topLeft" title="Back to create">
              <Button type="text" icon={<BsBackspaceReverse size={20} onClick={() => form.resetFields()} />}></Button>
            </Tooltip>
          </Link>
        ) : (
          ""
        )}
      </Space>
    );
  };
  const renderForm = () => {
    return (
      <Form form={form} onFinish={slug ? handleEdit : handleCreate} layout="inline" requiredMark={false} size="large">
        <Form.Item name="name" rules={[{ required: true, message: "Please input category!" }]}>
          <Input prefix={<BsArrowReturnRight />} placeholder="Enter category name..." autoFocus />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[
            { required: true, message: "Please input a link!" },
            {
              type: "url",
              warningOnly: true,
              message: "Please input a valid url!",
            },
          ]}
        >
          <Input prefix={<BsFillImageFill />} placeholder="Enter a image link..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {slug ? "Save" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const searched = (keyword) => (c) => c.slug.includes(keyword);

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
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <CategoryTable data={categories.filter(searched(keyword))} handleRemove={handleRemove} />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CategoryPage;
