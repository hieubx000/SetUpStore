import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./common/firebase";
import { currentUser } from "./functions/auth";
import Loader from "./components/loader/Loader";
import "./App.less";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./components/nav/Header";

// const UserRoute = lazy(() => import("./components/routes/UserRoute"));
// const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));

// const Header = lazy(() => import("./components/nav/Header"));
// const SideDrawer = lazy(() => import("./components/nav/SideDrawer"));
// const Home = lazy(() => import("./pages/Home"));
// const Product = lazy(() => import("./pages/Product"));
// const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
// const SubHome = lazy(() => import("./pages/sub/SubHome"));
// const Store = lazy(() => import("./pages/Store"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Checkout = lazy(() => import("./pages/Checkout"));
// const Payment = lazy(() => import("./pages/Payment"));

// const Login = lazy(() => import("./pages/auth/Login"));
// const Register = lazy(() => import("./pages/auth/Register"));
// const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
// const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
// const History = lazy(() => import("./pages/user/History"));
// const Setting = lazy(() => import("./pages/user/Setting"));
// const Wishlist = lazy(() => import("./pages/user/Wishlist"));
// const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
// const CategoryPage = lazy(() => import("./pages/admin/category/CategoryPage"));
// const SubPage = lazy(() => import("./pages/admin/sub/SubPage"));
// const CouponPage = lazy(() => import("./pages/admin/coupon/CouponPage"));
// const ProductPage = lazy(() => import("./pages/admin/product/ProductPage"));
// const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
// const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import Header from "./components/nav/Header";
import SideDrawer from "./components/nav/SideDrawer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Setting from "./pages/user/Setting";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryPage from "./pages/admin/category/CategoryPage";
import SubPage from "./pages/admin/sub/SubPage";
import CouponPage from "./pages/admin/coupon/CouponPage";
import ProductPage from "./pages/admin/product/ProductPage";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";

function App() {
  const dispatch = useDispatch();
  // to check firebase auth state
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                role: res.data.role,
                area: res.data.area,
                address: res.data.address,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer theme="light" />
      <SideDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/setting" component={Setting} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryPage} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryPage} />
        <AdminRoute exact path="/admin/sub" component={SubPage} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubPage} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={ProductPage} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/coupon" component={CouponPage} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
