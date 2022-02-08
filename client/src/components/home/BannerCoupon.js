import React from "react";
import { useSelector } from "react-redux";

import { Row, Col, Card, Typography, Space, Button, Skeleton, Badge } from "antd";
import { getCoupons } from "../../functions/coupon";
import { formatDate } from "../../common/utils";
import { FaGift } from "react-icons/fa";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function BannerCoupon() {
  const [loading, setLoading] = React.useState(false);
  const [coupons, setCoupons] = React.useState([]);
  const [coupon, setCoupon] = React.useState("");
  const [randomInt, setRandomInt] = React.useState(getRandomInt(0, 99));

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadRandomCoupon();
  }, [randomInt]);

  const loadRandomCoupon = () => {
    setLoading(true);
    getCoupons().then((res) => {
      const coupons = res.data;
      setCoupons(res.data);
      setCoupon(coupons[randomInt]);
      setLoading(false);
    });
  };
  return (
    <Badge
      offset={[12, 48]}
      count={
        <Button
          type="primary"
          size="large"
          disabled={loading}
          onClick={() => setRandomInt(randomInt !== getRandomInt(0, coupons.length + 6) && getRandomInt(0, coupons.length + 6))}
          icon={<FaGift />}
        ></Button>
      }
    >
      {/* {coupon && <Typography.Text ellipsis>You got a lucky coupon</Typography.Text>} */}
      <Card style={{ backgroundColor: "rgba(245, 103, 102, 0.06)" }}>
        {loading ? (
          <Skeleton.Input active style={{ width: 276 }} />
        ) : (
          <Row>
            <Col span={24}>
              {coupon ? (
                <Space direction="vertical" align="center">
                  <Typography.Text type="success">Hooray, You got a lucky coupon</Typography.Text>
                  <Space split="·">
                    <Typography.Paragraph style={{ margin: 0, fontSize: 24 }} copyable>
                      {coupon.name}
                    </Typography.Paragraph>
                    {/* <Typography.Text>{formatDate(coupon.expiry)}</Typography.Text> */}
                    <Typography.Text>{coupon.discount}%</Typography.Text>
                  </Space>
                </Space>
              ) : (
                <Typography.Text ellipsis>Oops, get your lucky coupon next time</Typography.Text>
              )}
            </Col>
          </Row>
        )}
      </Card>
    </Badge>
  );
}

export default BannerCoupon;
