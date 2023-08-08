import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import AdminRoute from "./protectedRoutes/AdminRoute";
import AdminDashBoard from "./admin/AdminDashBoard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import ProductDetails from "./home/productDetails";
import Cart from "./order/Cart";
import ShippingAddress from "./order/ShippingAddress";
import Checkout from "./order/Checkout";
import Payment from "./order/Payment";
import Coupon from "./admin/Coupon";
import Waiting from "./user/Waiting";

const Main = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/sociallogin/:token" element={<Waiting />} />
            <Route
                path="/dashboard"
                element={(
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>)} />
            {/* use wrpper class to render dashboard conditionally */}
            <Route
                path="/admindashboard"
                element={(
                    <AdminRoute>
                        <AdminDashBoard />
                    </AdminRoute>)} />
            <Route
                path="/admin/create-category"
                element={(
                    <AdminRoute>
                        <CreateCategory />
                    </AdminRoute>)} />

            <Route
                path="/admin/coupon"
                element={(
                    <AdminRoute>
                        <Coupon />
                    </AdminRoute>)} />

            <Route
                path="/admin/create-product"
                element={(
                    <AdminRoute>
                        <CreateProduct />
                    </AdminRoute>)} />
            <Route
                path="/cart"
                element={(
                    <PrivateRoute>
                        <Cart />
                    </PrivateRoute>)} />
            <Route
                path="/shipping"
                element={(
                    <PrivateRoute>
                        <ShippingAddress />
                    </PrivateRoute>)} />
            <Route
                path="/checkout"
                element={(
                    <PrivateRoute>
                        <Checkout />
                    </PrivateRoute>)} />
            <Route
                path="/payment/:finalAmount"
                element={(
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>)} />
        </Routes>

    )
}
export default Main;