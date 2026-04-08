import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Footer from "./FooterComponent"; // 1. Import Footer vào đây
import { Routes, Route, Navigate } from "react-router-dom";

import Product from "./ProductComponent";
import ProductDetail from "./ProductDetailComponent";
import Signup from "./SignupComponent";
import Active from "./ActiveComponent";
import Login from "./LoginComponent";
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';

class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        {/* Phần đầu trang */}
        <Menu />
        
        {/* Phần nội dung chính giữa (Sử dụng min-height để đẩy Footer xuống) */}
        <div className="main-content" style={{ minHeight: '70vh', paddingBottom: '30px' }}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/category/:cid" element={<Product />} />
            <Route path="/product/search/:keyword" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/active" element={<Active />} />
            <Route path="/login" element={<Login />} />
            <Route path='/myprofile' element={<Myprofile />} />
            <Route path='/mycart' element={<Mycart />} />
            <Route path='/myorders' element={<Myorders />} />
          </Routes>
        </div>

        {/* Phần chân trang - Sẽ luôn nằm dưới cùng */}
        <Footer />
      </div>
    );
  }
}

export default Main;