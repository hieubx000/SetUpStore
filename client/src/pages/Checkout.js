import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Layout, Row, Col } from "antd";

import { getUserCart, emptyUserCart, applyCoupon, createCashOrderForUser } from "../functions/user";
import CheckoutSteps from "../components/nav/CheckoutSteps";
import AddressForm from "../components/form/AddressForm";
import CouponApplyForm from "../components/form/CouponApplyForm";
import CheckoutSummary from "../components/list/CheckoutSummary";

function Checkout({ history }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [areaSaved, setAreaSaved] = React.useState(false);

  const [totalAfterDiscount, setTotalAfterDiscount] = React.useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponState = useSelector((state) => state.coupon);

  React.useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setAreaSaved(user.area);
    });
  }, []);

  const emptyCart = () => {
    setLoading(true);
    // remove from local storage
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setLoading(false);
      setTotalAfterDiscount(0);
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const applyDiscountCoupon = ({ coupon }) => {
    setLoading(true);
    // console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      // console.log("RES ON COUPON APPLIED", res.data);
      // error
      if (res.data.err) {
        setLoading(false);
        toast.error(res.data.err);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      } else if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });

        setLoading(false);
        toast.success("Discount applied successfully!");
      }
    });
  };

  const createCashOrder = () => {
    setLoading(true);
    createCashOrderForUser(user.token, COD, couponState).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // empty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          setLoading(false);
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <Layout.Content>
      <CheckoutSteps current={1} />
      <Row wrap={false} gutter={[24, 24]}>
        <Col flex="auto">
          <AddressForm />
          <CouponApplyForm loading={loading} disabled={!products.length} onFinish={applyDiscountCoupon} />
        </Col>
        <Col flex="560px">
          <CheckoutSummary
            loading={loading}
            disabled={!areaSaved}
            products={products}
            total={total}
            totalAfterDiscount={totalAfterDiscount}
            createCashOrder={createCashOrder}
            emptyCart={emptyCart}
          />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Checkout;
