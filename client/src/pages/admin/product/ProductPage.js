import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { Layout, Button, Row, Col, Card } from "antd";

import { getProductsByLimit, removeProduct } from "../../../functions/product";

import Loader from "../../../components/loader/Loader";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";

function ProductPage() {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByLimit(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // console.log("send delete request", slug);
    removeProduct(slug, user.token)
      .then((res) => {
        loadAllProducts();
        toast.error(`${res.data.name} is deleted`);
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
        console.log(err);
      });
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
          <Card style={{ marginBottom: 24 }}>
            <Link to="/admin/product">
              <Button type="primary" size="large">
                Create new product
              </Button>
            </Link>
          </Card>
          <Card>
            <Row gutter={[24, 24]}>
              {products.map((product) => (
                <AdminProductCard key={product._id} product={product} handleRemove={handleRemove} />
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default ProductPage;
