import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Row, Button, Input, Form } from "antd";
import { FaSearch } from "react-icons/fa";

function Search({ affixed }) {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = () => {
    history.push(`/store?${text}`);
  };
  return (
    <Row align="middle" justify="center">
      <Form name="header-search" style={{ width: "100%", lineHeight: 1.4 }} onFinish={handleSubmit}>
        <Input
          style={{
            borderRadius: 100,
            padding: "5px 8px 5px 20px",
            backgroundColor: affixed ? "transparent" : "rgba(245, 103, 102, 0.06)",
            borderColor: !affixed && "transparent",
          }}
          allowClear
          placeholder="Type your product ..."
          value={text}
          onChange={handleChange}
          onPressEnter={handleSubmit}
          suffix={
            <Button type="primary" shape="round" size="large" onClick={handleSubmit} style={{ display: "flex" }}>
              <FaSearch size={18} />
            </Button>
          }
        />
      </Form>
    </Row>
  );
}

export default Search;
