import React from "react";

import { Row, Col, Layout, Divider, Empty } from "antd";

import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";
import SubList from "../../components/list/SubList";

function SubHome({ match }) {
  const [sub, setSub] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { slug } = match.params;

  React.useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <Layout.Content style={{ paddingTop: 24 }}>
      <SubList type="image" />
      <Row>
        <Col>
          {loading ? (
            <Divider orientation="left">Loading...</Divider>
          ) : (
            <Divider orientation="left">
              {products.length} Products in "{sub.name}" sub-category
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

export default SubHome;
