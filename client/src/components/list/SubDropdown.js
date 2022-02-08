import React from "react";
import { getCategories, getCategorySubs } from "../../functions/category";

function SubDropdown({ parentId }) {
  const [subs, setSubs] = React.useState([]);

  React.useEffect(() => {
    loadSubByCategory();
  }, []);

  const loadSubByCategory = () => {
    getCategorySubs(parentId)
      .then((res) => setSubs(res.data))
      .catch((err) => console.log(err));
  };

  return <div></div>;
}

export default SubDropdown;
