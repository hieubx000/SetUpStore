import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/stripe/StripeCheckout";
import "../components/stripe/stripe.css";

import { Layout, Row, Col } from "antd";

import CheckoutSteps from "../components/nav/CheckoutSteps";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY || "pk_test_");

function Payment({ history }) {
  return (
    <Layout.Content>
      <CheckoutSteps current={2} />
      <Row gutter={[24, 24]} justify="center">
        <Col span={12}>
          <Elements stripe={promise}>
            <StripeCheckout />
          </Elements>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Payment;
