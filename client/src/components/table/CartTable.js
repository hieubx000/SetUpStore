import React from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Table, Button, Typography, Space, Popconfirm, Tag, Image, InputNumber, Select, Statistic } from "antd";

import { BsTrash, BsThreeDots, BsCheckLg, BsXLg } from "react-icons/bs";
import { colors } from "../../common/constant";

function CartTable({ loading, data }) {
  let dispatch = useDispatch();

  const handleQuantityChange = (value, p) => {
    let count = value < 1 ? 1 : value;
    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const handleColorChange = (value, p) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].color = value;
        }
      });
      //  console.log('cart update color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const handleRemove = (p) => {
    // console.log(p._id, "to remove");
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (text) => <Image src={text[0].url} alt={text[0].public_id} key={text[0].public_id} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 160,
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 160,
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (text) => <Statistic value={text} groupSeparator="." prefix="$"></Statistic>,

      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      width: 100,
      render: (text, record) => <InputNumber value={record.count} onChange={(value) => handleQuantityChange(value, record)} />,

      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 100,
      render: (text, record) => (
        <Select onSelect={(value) => handleColorChange(value, record)} value={record.color} placeholder="Select color.." style={{ width: "100%" }}>
          {colors
            .filter((c) => c !== record.color)
            .map((c) => (
              <Select.Option key={c} value={c}>
                <Tag color={c.toLowerCase() !== "white" && c.toLowerCase()}>{c}</Tag>
              </Select.Option>
            ))}
        </Select>
      ),
      filters: [...colors.map((c) => ({ text: c, value: c }))],
      onFilter: (value, record) => record.color === value,
    },
    {
      title: "Shipping",
      dataIndex: "shipping",
      key: "shipping",
      width: 100,
      render: (text) => <Tag color={text.toLowerCase() === "yes" ? "success" : "error"}>{text}</Tag>,
    },
    {
      title: <BsThreeDots size={24} />,
      dataIndex: "",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title={
              <p>
                Sure to delete <b>{record.name}</b> ?
              </p>
            }
            placement="topRight"
            okText={<BsCheckLg />}
            cancelText={<BsXLg />}
            onConfirm={() => handleRemove(record)}
          >
            <Button size="large" type="text" danger icon={<BsTrash />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      // title={() => ""}
      footer={() => ""}
      rowKey={(record) => record._id}
      dataSource={data}
      // pagination={{ pageSize: 4, position: ["topRight"] }}
      pagination={false}
    />
  );
}

export default CartTable;
