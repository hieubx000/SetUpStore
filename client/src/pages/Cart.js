import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Row, Col, Card } from "antd";

import { userCart } from "../functions/user";
import CartTable from "../components/table/CartTable";
import CartSummary from "../components/list/CartSummary";
import EmptyCard from "../components/cards/EmptyCard";
import CheckoutSteps from "../components/nav/CheckoutSteps";

function Cart({ history }) {
  const [loading, setLoading] = React.useState(false);
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    setLoading(true);
    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RES", res);
        setLoading(false);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    setLoading(true);
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        setLoading(false);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <Layout.Content>
      <CheckoutSteps current={0} />
      <Row wrap={false} gutter={[24, 24]}>
        <Col flex="auto">
          {!cart.length ? (
            <EmptyCard type={"cart"} />
          ) : (
            <Card size="small">
              <CartTable loading={loading} data={cart} />
            </Card>
          )}
        </Col>
        <Col flex="360px">
          <CartSummary loading={loading} saveOrderToDb={saveOrderToDb} saveCashOrderToDb={saveCashOrderToDb} />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Cart;
