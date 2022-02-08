import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Card, Col, Image, Typography, Space, Button, Statistic, Rate, Divider, Tooltip, Tag, Badge } from "antd";
import { FiHeart } from "react-icons/fi";
import { BsCartPlus, BsSearch } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

import _ from "lodash";
import { addToWishlist } from "../../functions/user";

function ProductCardCarousel({ product, size = "default" }) {
  const { name, desc, images, slug, price } = product;
  const [tooltip, setTooltip] = React.useState("Click to add");

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
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
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

  const renderBadgeStatus = () => {
    if (product.quantity < 1) return <Tag color="error">Out of stock</Tag>;
    else if (product.sold / (product.quantity + product.sold) > 0.8)
      return (
        <Tag icon={<ImFire />} color="success">
          Trending
        </Tag>
      );
  };

  const renderThumbnail = () => (
    <Badge offset={[-24, 0]} count={renderBadgeStatus()}>
      <Image
        alt={slug}
        height={180}
        width={"100%"}
        style={{ borderRadius: 8 }}
        src={images && images.length ? images[0].url : "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
        preview={{
          visible: false,
          mask: (
            <Space size={16}>
              <Link to={`/product/${slug}`}>
                <Button type="primary" shape="circle" size="large" icon={<BsSearch />}></Button>
              </Link>
              <Tooltip title={product.quantity < 1 ? "Out of Stock" : tooltip}>
                <Button type="primary" shape="circle" size="large" onClick={handleAddToCart} disabled={product.quantity < 1} icon={<BsCartPlus />}></Button>
              </Tooltip>
              {user ? (
                <Tooltip title={product.wishlist && product.wishlist.includes(user._id) ? "Added" : "Click to add"}>
                  {product.wishlist && product.wishlist.includes(user._id) ? (
                    <Button type="primary" shape="circle" size="large" icon={<FaHeart />}></Button>
                  ) : (
                    <Button type="primary" shape="circle" size="large" onClick={handleAddToWishlist} icon={<FiHeart />}></Button>
                  )}
                </Tooltip>
              ) : (
                <Button type="primary" shape="circle" size="large" icon={<FiHeart />} onClick={() => toast.error("Login to add to Wishlist")}></Button>
              )}
            </Space>
          ),
        }}
      />
    </Badge>
  );

  const renderContent = () => (
    <Space direction="vertical" style={{ margin: "-16px" }}>
      {size === "default" ? (
        <>
          <Typography.Title level={3} style={{ maxWidth: 260, marginBottom: 0 }} ellipsis>
            {name}
          </Typography.Title>
          <Typography.Text ellipsis style={{ maxWidth: 280 }}>
            {desc}
          </Typography.Text>
          <Space split={<Divider type="vertical" />}>
            <Rate disabled allowHalf defaultValue={2.5} />
            <Space>
              <Statistic groupSeparator="." valueStyle={{ fontSize: 20 }} value={price} suffix="$" />
              <Tag color="volcano" icon={<FaHeart />} style={{ padding: "4px 8px", border: 0, display: "flex", alignItems: "center", gap: 4 }}>
                {product.wishlist.length > 0 ? product.wishlist.length : "_"}
              </Tag>
            </Space>
          </Space>
        </>
      ) : (
        <>
          <Typography.Title level={4} style={{ maxWidth: 220, marginBottom: 0 }} ellipsis>
            {name}
          </Typography.Title>
          <Typography.Text ellipsis style={{ maxWidth: 240 }}>
            {desc}
          </Typography.Text>
          <Space split={<Divider type="vertical" />}>
            <Space>
              <Tag color="gold" icon={<AiFillStar size={16} />} style={{ padding: "4px 8px", border: 0, display: "flex", alignItems: "center", gap: 4 }}>
                {2.5}
              </Tag>
              <Tag color="volcano" icon={<FaHeart />} style={{ padding: "4px 8px", border: 0, display: "flex", alignItems: "center", gap: 4 }}>
                {product.wishlist.length > 0 ? product.wishlist.length : "_"}
              </Tag>
            </Space>
            <Statistic groupSeparator="." valueStyle={{ fontSize: 20 }} value={price} suffix="$" />
          </Space>
        </>
      )}
      {/* <Statistic value={price} suffix={<Typography.Text underline>đ</Typography.Text>}/> */}
    </Space>
  );

  return (
    <Col sm={12} lg={8} xxl={6}>
      <Card style={{ padding: 16 }} hoverable bordered={false} size="small" cover={renderThumbnail()}>
        {renderContent()}
      </Card>
    </Col>
  );
}

export default ProductCardCarousel;
