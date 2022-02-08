import React from "react";

import { Row, Col, Layout, Divider, Empty } from "antd";

import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/list/CategoryList";

function CategoryHome({ match }) {
  const [category, setCategory] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { slug } = match.params;

  React.useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <Layout.Content style={{ paddingTop: 24 }}>
      <CategoryList />
      <Row>
        <Col>
          {loading ? (
            <Divider orientation="left">Loading...</Divider>
          ) : (
            <Divider orientation="left">
              {products.length} Products in "{category.name}" category
            </Divider>
          )}
        </Col>
      </Row>
      {products.length === 0 ? (
        <Empty />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <ProductCard product={p} />
          ))}
        </Row>
      )}
    </Layout.Content>
  );
}

export default CategoryHome;
