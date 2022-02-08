import React from "react";
import { useSelector } from "react-redux";

import { Layout, Row, Col, Card, Typography } from "antd";

import { getUserOrders } from "../../functions/user";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import OrdersList from "../../components/list/OrdersList";
import EmptyCard from "../../components/cards/EmptyCard";

function History() {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    setLoading(true);
    getUserOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
      setLoading(false);
    });
  };

  return (
    <Layout.Content>
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <Typography.Title level={3}>Your History</Typography.Title>
            {orders.length > 0 ? <OrdersList loading={loading} orders={orders} /> : <EmptyCard type={"history"} />}
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default History;
