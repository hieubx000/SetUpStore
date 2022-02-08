import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { currentAdmin } from "../../functions/auth";

import LoadingToRedirect from "./LoadingToRedirect";

function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = React.useState(false);

  React.useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          // console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          // console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
}

export default AdminRoute;
