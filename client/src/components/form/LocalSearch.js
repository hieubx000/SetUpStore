import React from "react";

import { Input } from "antd";
import { FaSearch } from "react-icons/fa";

function LocalSearch({ keyword, setKeyword }) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Input
      size="large"
      placeholder="Search..."
      value={keyword}
      onChange={handleSearchChange}
      allowClear
      prefix={<FaSearch size={18} />}
      style={{ width: 257 }}
    />
  );
}

export default LocalSearch;
