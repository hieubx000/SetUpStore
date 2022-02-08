import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { toast } from "react-toastify";
import { Card, Row, Col, Space, Button, Tooltip } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BsCartPlus, BsStar } from "react-icons/bs";
import ProductListItems from "./ProductListItems";
import { addToWishlist } from "../../functions/user";

const SingleProduct = ({ product }) => {
  const { images, slug } = product;
  const [tooltip, setTooltip] = React.useState("Click to add");

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let history = useHistory();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");
      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      // console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <Row gutter={[24, 0]} wrap={false} style={{ marginTop: 24 }}>
      <Col span={12}>
        {images && images.length ? (
          <Carousel autoPlay infiniteLoop thumbWidth={100} interval={3000}>
            {images && images.map((item) => <img src={item.url} alt={item.public_id} key={item.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"} alt={slug} height={450} />}></Card>
        )}
      </Col>
      <Col span={12}>
        <Space direction="vertical" size={48}>
          <Card bordered={false} style={{ margin: 0 }}>
            <ProductListItems product={product} />

            <Row gutter={[24, 24]} wrap={false} justify="center" style={{ marginTop: 24 }}>
              <Col span={8}>
                <Tooltip title={product.quantity < 1 ? "Out of Stock" : tooltip}>
                  <Button type="primary" block size="large" disabled={product.quantity < 1} onClick={handleAddToCart} icon={<BsCartPlus />}>
                    {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                  </Button>
                </Tooltip>
              </Col>
              <Col span={8}>
                {user ? (
                  product.wishlist && product.wishlist.includes(user._id) ? (
                    <Link to={"/user/wishlist"}>
                      <Tooltip title="Already in your wishlist" placement="top">
                        <Button type="link" block size="large" icon={<FaHeart />}>
                          Added
                        </Button>
                      </Tooltip>
                    </Link>
                  ) : (
                    <Button type="link" block size="large" onClick={handleAddToWishlist} icon={<FiHeart />}>
                      Add to Wishlist
                    </Button>
                  )
                ) : (
                  <Button type="link" block size="large" icon={<FiHeart />} onClick={() => toast.error("Login to add to Wishlist")}>
                    Add to Wishlist
                  </Button>
                )}
              </Col>
              <Col span={8}>
                {user ? (
                  <Button type="link" block size="large" icon={<BsStar />}>
                    Rating
                  </Button>
                ) : (
                  <Button type="link" block size="large" icon={<BsStar />} onClick={() => toast.error("Login to Rating")}>
                    Rating
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default SingleProduct;
