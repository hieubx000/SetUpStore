import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSub, removeSub, getSubs, updateSub } from "../../../functions/sub";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card, Typography, Space, Tooltip, Button, Select, Input } from "antd";

import Loader from "../../../components/loader/Loader";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import LocalSearch from "../../../components/form/LocalSearch";
import SubTable from "../../../components/table/SubTable";
import { BsBackspaceReverse, BsArrowReturnRight, BsFillImageFill } from "react-icons/bs";
function SubPage({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  const [sub, setSub] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [subs, setSubs] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const slug = match.params.slug;

  React.useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  React.useEffect(() => {
    loadCategories();
    if (slug) {
      const loadSub = () =>
        getSub(slug).then((res) => {
          setSub(res.data.sub);
          form.setFieldsValue({ parent: res.data.sub.parent, name: res.data.sub.name, image: res.data.sub.image });
        });
      loadSub();
    } else {
      loadSubs();
    }
  }, [form, slug]);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleCreate = (values) => {
    const { name, parent, image } = values;
    // console.log(name);
    setLoading(true);
    createSub({ name, parent, image }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        toast.success(`"${res.data.name}" is created`);
        form.resetFields();
        loadSubs();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (slug) => {
    // console.log(answer, slug);
    setLoading(true);
    removeSub(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        history.replace("/admin/sub");
        form.resetFields();
        loadSubs();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (values) => {
    const { name, parent, image } = values;
    // console.log(name);
    setLoading(true);
    updateSub(slug, { name, parent, image }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        form.resetFields();
        toast.success(`"${res.data.name}" is updated`);
        history.replace("/admin/sub");
        loadSubs();
      })
      .catch((err) => console.log(err));
  };

  const renderFormTitle = () => {
    return (
      <Space size="small" align="start">
        <Typography.Title level={4}>{slug ? `Update ${sub.name}` : "Create new subcategory"}</Typography.Title>
        {slug ? (
          <Link to="/admin/sub">
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
        <Form.Item name="parent" rules={[{ required: true, message: "Please select category!" }]}>
          <Select size="large" placeholder="Please select category..." style={{ width: 257 }}>
            {categories.length > 0 &&
              categories.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" rules={[{ required: true, message: "Please input subcategory!" }]}>
          <Input prefix={<BsArrowReturnRight />} placeholder="Enter subcategory name..." autoFocus />
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
            <SubTable categories={categories} data={subs.filter(searched(keyword))} handleRemove={handleRemove} />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default SubPage;
