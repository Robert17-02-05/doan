import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import Category from "./CategoryComponent";
import Product from "./ProductComponent";
import Order from "./OrderComponent";
import Customer from "./CustomerComponent";
import Footer from "./FooterComponent";

class Main extends Component {
  static contextType = MyContext;

  render() {
  if (this.context.token !== "") {
    return (
      <div className="body-admin">
        <Menu />

        <Routes>
          <Route
            path="/admin"
            element={<Navigate replace to="/admin/home" />}
          />
          <Route path="/admin/customer" element={<Customer />} />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/order" element={<Order />} />
        </Routes>

        <Footer /> {/* 🔥 THÊM DÒNG NÀY */}
      </div>
    );
  }

  return <div />;
}
}

export default Main;
