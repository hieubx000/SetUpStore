import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu, Card } from "antd";
import { BiCategory, BiStore } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { RiHistoryFill, RiSettings4Line, RiDashboardLine, RiCouponLine } from "react-icons/ri";

function UserNav() {
  let { user } = useSelector((state) => ({ ...state }));
  let { pathname } = useLocation();

  const renderUserNav = () => {
    return (
      <Menu mode="inline" selectedKeys={[pathname.split("/")[2]]}>
        <Menu.Item icon={<FiHeart />} key="wishlist">
          <Link to="/user/wishlist">Wishlist</Link>
        </Menu.Item>
        <Menu.Item icon={<RiHistoryFill />} key="history">
          <Link to="/user/history">History</Link>
        </Menu.Item>
        <Menu.Item icon={<RiSettings4Line />} key="setting">
          <Link to="/user/setting">Setting</Link>
        </Menu.Item>
      </Menu>
    );
  };

  const renderAdminNav = () => {
    return (
      <Menu mode="inline" selectedKeys={[pathname.split("/")[2]]}>
        <Menu.ItemGroup title="Admin">
          <Menu.Item icon={<RiDashboardLine />} key="dashboard">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item icon={<BiStore />} key="products">
            <Link to="/admin/products">Product</Link>
          </Menu.Item>
          <Menu.Item icon={<BiCategory />} key="category">
            <Link to="/admin/category">Category</Link>
          </Menu.Item>
          <Menu.Item icon={<BiCategory />} key="sub">
            <Link to="/admin/sub">Sub-category</Link>
          </Menu.Item>
          <Menu.Item icon={<RiCouponLine />} key="coupon">
            <Link to="/admin/coupon">Coupon</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="User">
          <Menu.Item icon={<FiHeart />} key="wishlist">
            <Link to="/user/wishlist">Wishlist</Link>
          </Menu.Item>
          <Menu.Item icon={<RiHistoryFill />} key="history">
            <Link to="/user/history">History</Link>
          </Menu.Item>
          <Menu.Item icon={<RiSettings4Line />} key="setting">
            <Link to="/user/setting">Setting</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  };
  return <Card>{user.role === "admin" ? renderAdminNav() : renderUserNav()}</Card>;
}

export default UserNav;
