import React from "react";
import { Row, Avatar, Space } from "antd";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

function CategoryList() {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Space key={c._id} direction="vertical" size={0}>
        <Link to={`/category/${c.slug}`}>
          <Avatar size={64} shape="square" src={c.image} />
        </Link>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </div>
      </Space>
    ));

  return (
    <Row justify="space-between" style={{ padding: "0 32px" }}>
      {loading ? <h4>Loading...</h4> : showCategories()}
    </Row>
  );
}

export default CategoryList;
