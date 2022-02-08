import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Typography, Row, Col, Empty, Menu, Slider, Checkbox, Space, Tag, Card } from "antd";

import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { getProductsByLimit, fetchProductsByFilter } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import Star from "../components/form/Star";
import { colors } from "../common/constant";

import { AiOutlineDollar, AiOutlineBgColors, AiFillStar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

function Store() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState([0, 0]);
  const [ok, setOk] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [categoryIds, setCategoryIds] = React.useState([]);
  const [subs, setSubs] = React.useState([]);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  React.useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByLimit(40).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
  const resetStates = () => {
    setPrice([0, 0]);
    setCategoryIds([]);
  };
  // load products on user search input
  React.useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 500);
    return () => clearTimeout(delayed);
  }, [text]);

  // load products based on price range
  React.useEffect(() => {
    if (ok) fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    resetStates();

    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // load products based on category
  // show categories in a list of checkbox
  const showCategories = () => (
    <Space direction="vertical" size={12}>
      {categories.map((c) => (
        <Checkbox key={c._id} onChange={handleCheck} value={c._id} checked={categoryIds.includes(c._id)}>
          {c.name}
        </Checkbox>
      ))}
    </Space>
  );

  // handle check for categories
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    resetStates();

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    if (inTheState.length > 0) fetchProducts({ category: inTheState });
    else loadAllProducts();
  };
  // show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    resetStates();
    console.log(num);
    // fetchProducts({ stars: num });
  };

  const showStars = () => (
    <Space direction="vertical" size={12}>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </Space>
  );

  // show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <Tag key={s._id} onClick={() => handleSub(s)} color="volcano" style={{ cursor: "pointer", margin: 4 }}>
        {s.name}
      </Tag>
    ));
  const handleSub = (sub) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    resetStates();

    fetchProducts({ sub });
  };
  // show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Tag key={c} color={c.toLowerCase() !== "white" && c.toLowerCase()} onClick={() => handleColor(c)} style={{ cursor: "pointer", margin: 4 }}>
        {c}
      </Tag>
    ));

  const handleColor = (color) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    resetStates();

    fetchProducts({ color });
  };

  // show products based on shipping yes/no

  const renderMenu = () => (
    <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline" theme="light" style={{ paddingRight: 8, margin: "32px 0" }}>
      <Menu.SubMenu key="1" icon={<AiOutlineDollar />} title={<span>Price</span>}>
        <div style={{ margin: "24px 8px" }}>
          <Slider tipFormatter={(v) => `$${v}`} range max="1999" value={price} onChange={handleSlider} />
        </div>
      </Menu.SubMenu>
      <Menu.SubMenu key="2" icon={<BiCategory />} title={<span>Categories</span>}>
        <div style={{ margin: "16px 24px" }}>{showCategories()}</div>
      </Menu.SubMenu>
      <Menu.SubMenu key="3" icon={<AiFillStar />} title={<span>Rating</span>}>
        <div style={{ margin: "16px 24px" }}>{showStars()}</div>
      </Menu.SubMenu>
      <Menu.SubMenu key="4" icon={<BiCategory />} title={<span>Sub Categories</span>}>
        <div style={{ margin: "16px 24px" }}>{showSubs()}</div>
      </Menu.SubMenu>
      <Menu.SubMenu key="5" icon={<AiOutlineBgColors />} title={<span>Colors</span>}>
        <div style={{ margin: "16px 24px" }}>{showColors()}</div>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <Layout.Content>
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="280px">{renderMenu()}</Col>

        <Col flex="auto">
          <Typography.Title level={3}>Products</Typography.Title>

          {loading ? (
            <LoadingCard count={8} />
          ) : products.length < 1 ? (
            <Card>
              <Empty />
            </Card>
          ) : (
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <ProductCard size="small" key={product._id} product={product} />
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Store;
