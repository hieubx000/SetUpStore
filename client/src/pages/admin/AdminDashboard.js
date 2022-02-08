import React from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Layout, Typography, Row, Col, Card } from "antd";

import { getOrders, changeStatus } from "../../functions/admin";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import OrderTable from "../../components/table/OrderTable";

function AdminDashboard() {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
      setLoading(false);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
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
            <Typography.Title level={3}>AdminDashboard</Typography.Title>
            <OrderTable loading={loading} data={orders} handleStatusChange={handleStatusChange} />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default AdminDashboard;
