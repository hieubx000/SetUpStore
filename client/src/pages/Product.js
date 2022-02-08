import React from "react";

import { Layout, Typography, Row, Divider, Empty } from "antd";
import { getProduct, getRelated } from "../functions/product";

import Loader from "../components/loader/Loader";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";

function Product({ match }) {
  const [product, setProduct] = React.useState({});
  const [related, setRelated] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { slug } = match.params;

  React.useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    setLoading(true);
    getProduct(slug)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
        getRelated(res.data._id).then((res) => setRelated(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout.Content>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SingleProduct product={product} />
          <Divider orientation="left">
            <Typography.Link>Related Products</Typography.Link>
          </Divider>
          <Row gutter={[16, 16]}>{related.length ? related.map((r) => <ProductCard key={r._id} product={r} />) : <Empty />}</Row>
        </>
      )}
    </Layout.Content>
  );
}

export default Product;
