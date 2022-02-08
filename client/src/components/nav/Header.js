import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import { Row, Col, Layout, Menu, Dropdown, Badge, Button, Avatar, Typography, Affix, Space } from "antd";
import Search from "../form/Search";

import { FaStore, FaShoppingCart, FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut, FiHeart } from "react-icons/fi";
import { RiHistoryFill, RiAdminLine } from "react-icons/ri";

function Header() {
  let dispatch = useDispatch();
  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let { pathname } = useLocation();
  const [affixed, setAffixed] = React.useState(false);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    history.replace("/login");
  };

  const renderHeaderNav = () => (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[pathname.split("/")[1]]}
        style={{ lineHeight: "46px", backgroundColor: "transparent", borderBottom: "none", zIndex: 10 }}
      >
        <Menu.Item key="store">
          <Link to="/store">
            <FaStore size={30} />
          </Link>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge count={cart.length}>
            <Link to="/cart">
              <FaShoppingCart size={28} />
            </Link>
          </Badge>
        </Menu.Item>
      </Menu>
    </>
  );

  const renderLoginWrapper = () => {
    return (
      <>
        <Button type="link" shape="round" size="large">
          <Link to="/login">Login</Link>
        </Button>
        <Button type="primary" shape="round" size="large">
          <Link to="/register">Register</Link>
        </Button>
      </>
    );
  };

  const renderDropdownMenu = () => {
    const iconSize = 22;
    const dropdownItemStyle = { borderRadius: 8 };
    const dropdownTextStyle = { padding: 10, display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "bold" };
    const menu = (
      <Menu style={{ borderRadius: 8, padding: 8 }}>
        {user.role !== "admin" ? (
          <>
            <Menu.Item style={dropdownItemStyle} key="profile">
              <Link to="/user/history" style={dropdownTextStyle}>
                Profile <FaRegUserCircle size={iconSize} />
              </Link>
            </Menu.Item>
            <Menu.Item style={dropdownItemStyle} key="wishlist">
              <Link to="/user/wishlist" style={dropdownTextStyle}>
                Wishlist <FiHeart size={iconSize} />
              </Link>
            </Menu.Item>
            <Menu.Item style={dropdownItemStyle} key="history">
              <Link to="/user/history" style={dropdownTextStyle}>
                History <RiHistoryFill size={iconSize} />
              </Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item style={dropdownItemStyle} key="dashboard">
            <Link to="/admin/dashboard" style={dropdownTextStyle}>
              Dashboard <RiAdminLine size={iconSize} />
            </Link>
          </Menu.Item>
        )}
        <Menu.Item style={dropdownItemStyle} onClick={logout} key="logout">
          <span style={dropdownTextStyle}>
            <span style={{ fontWeight: "normal" }}>Logout</span> <FiLogOut size={iconSize} />
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Space size="small" align="center">
          <Button
            size="large"
            shape="circle"
            ghost={!affixed}
            style={{ height: 50, width: 50, padding: 2, backgroundColor: affixed ? "transparent" : "rgba(245, 103, 102, 0.1)" }}
          >
            <Avatar size="large" src={user.picture} alt="avatar" />
          </Button>
          <Typography.Text type="secondary" style={{ width: 80, fontWeight: "bold" }} ellipsis>
            {user.name}
          </Typography.Text>
          <FaChevronDown className="dropdown-caret" />
        </Space>
      </Dropdown>
    );
  };

  const renderHeaderLeft = () => (
    <Row align="middle" style={{ height: 70 }}>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"
        alt="logo"
        style={{ height: "inherit" }}
      />
      <Link to="/" style={{ fontSize: 28, fontWeight: "bold" }}>
        SetUpStore
      </Link>
    </Row>
  );

  return (
    <>
      <div style={{ height: 0.1, backgroundColor: "transparent" }}></div>
      <Affix offsetTop={affixed && 0.000001} onChange={(affixed) => setAffixed(affixed)}>
        <Layout.Header style={{ height: "auto", backgroundColor: affixed ? "#fff" : "transparent" }} className={affixed && "boxshadow"}>
          <Row justify="space-between" align="middle">
            <Col span={7}>{renderHeaderLeft()}</Col>
            <Col span={10}>
              <Search affixed={affixed} />
            </Col>
            <Col span={4}>
              <Row align="middle" justify="end">
                {!user ? renderLoginWrapper() : renderDropdownMenu()}
              </Row>
            </Col>
            <Col span={3}>
              <Row align="bottom" justify="end">
                {renderHeaderNav()}
              </Row>
            </Col>
          </Row>
        </Layout.Header>
      </Affix>
    </>
  );
}
export default Header;
