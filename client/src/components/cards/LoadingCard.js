import React from "react";
import { Card, Skeleton, Row, Col } from "antd";

function LoadingCard({ count }) {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Col sm={12} lg={8} xl={6} xxl={6} key={i}>
          <Card>
            <Skeleton active></Skeleton>
          </Card>
        </Col>
      );
    }

    return totalCards;
  };

  return <Row gutter={[24, 24]}>{cards()}</Row>;
}

export default LoadingCard;
