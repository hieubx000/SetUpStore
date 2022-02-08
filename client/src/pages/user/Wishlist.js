import React from "react";
import { useSelector } from "react-redux";

import { Layout, Row, Col, Card, Typography } from "antd";

import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import WishlistList from "../../components/list/WishlistList";
import { getWishlist, removeWishlist } from "../../functions/user";

function Wishlist() {
  const [wishlist, setWishlist] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    setLoading(true);
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
      setLoading(false);
    });
  };

  const handleRemove = (productId) => {
    setLoading(true);
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
      setLoading(false);
    });
  };

  return (
    <Layout.Content>
      <Row gutter={[24, 24]}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <Typography.Title level={3}>Your Wishlist</Typography.Title>
            <WishlistList loading={loading} wishlist={wishlist} handleRemove={handleRemove} />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Wishlist;
