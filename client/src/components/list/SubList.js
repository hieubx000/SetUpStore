import React from "react";
import { Link } from "react-router-dom";

import { Row, Avatar, Space, Button } from "antd";
import { getSubs } from "../../functions/sub";

function SubList({ type = "image" }) {
  const [subs, setSubs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <Space key={s._id} direction="vertical" size={0}>
        <Link to={`/sub/${s.slug}`}>
          <Avatar size={64} shape="square" src={s.image} />
        </Link>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          <Link to={`/sub/${s.slug}`}>{s.name}</Link>
        </div>
      </Space>
    ));

  const showSubsTag = () =>
    subs.map((s) => (
      <Link key={s._id} to={`/sub/${s.slug}`}>
        <Button ghost type="primary">
          {s.name}
        </Button>
      </Link>
    ));

  return (
    <Row justify="center" gutter={[16, 16]} style={{ padding: "0 32px" }}>
      {loading ? <h4>Loading...</h4> : type === "image" ? showSubs() : showSubsTag()}
    </Row>
  );
}

export default SubList;
