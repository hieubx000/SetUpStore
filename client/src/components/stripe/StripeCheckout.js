import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card, Typography, Space, Row, Col, Statistic, Divider, Alert } from "antd";

import { createPaymentIntent } from "../../functions/stripe";
import { createOrder, emptyUserCart } from "../../functions/user";

function StripeCheckout({ history }) {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [processing, setProcessing] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [clientSecret, setClientSecret] = React.useState("");

  const [cartTotal, setCartTotal] = React.useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = React.useState(0);
  const [payable, setPayable] = React.useState(0);

  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);

      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <Row gutter={[24, 24]}>
      {!succeeded && (
        <Col span={24}>
          {coupon && totalAfterDiscount !== undefined ? (
            <Alert
              message={
                <Space>
                  Total after discount
                  <Statistic prefix="$" groupSeparator="." value={totalAfterDiscount} />
                </Space>
              }
              type="success"
            />
          ) : (
            <Alert message="No coupon applied" type="error" />
          )}
        </Col>
      )}
      <Col span={24}>
        <Card cover={<img src={"https://source.unsplash.com/random?setup"} alt="" height={200} />}>
          <Row justify="space-around">
            <Statistic title="Total" prefix="$" groupSeparator="." value={cartTotal} />
            <Divider type="vertical" style={{ height: "auto" }} />
            <Statistic title="Total payable" prefix="$" groupSeparator="." valueStyle={{ color: "#07bc0c" }} value={payable / 100} />
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
          <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
          <button className="stripe-button" disabled={processing || disabled || succeeded}>
            <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : "Pay"}</span>
          </button>
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
          {succeeded && (
            <Alert
              message={
                <Typography.Text className="result-message">
                  Payment Successful. <Link to="/user/history">See it in your purchase history.</Link>
                </Typography.Text>
              }
              style={{ marginTop: 24 }}
              type="success"
              showIcon
            />
          )}
        </form>
      </Col>
    </Row>
  );
}

export default StripeCheckout;
