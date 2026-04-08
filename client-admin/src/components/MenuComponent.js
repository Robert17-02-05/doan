import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Menu extends Component {
  static contextType = MyContext;

  render() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        
        {/* 1. BÊN TRÁI: LOGO */}
        <div className="logo">
          <Link to="/admin/home">SHOP ONLINE</Link>
        </div>

        {/* 2. Ở GIỮA: DANH SÁCH MENU */}
        <ul className="nav-links">
          <li><Link to="/admin/home" className="nav-item">HOME</Link></li>
          <li><Link to="/admin/category" className="nav-item">CATEGORY</Link></li>
          <li><Link to="/admin/product" className="nav-item">PRODUCT</Link></li>
          <li><Link to="/admin/order" className="nav-item">ORDER</Link></li>
          <li><Link to="/admin/customer" className="nav-item">CUSTOMER</Link></li>
        </ul>

        {/* 3. BÊN PHẢI: THÔNG TIN ADMIN */}
        <div className="admin-info">
          Chào, <b>admin</b> | <Link to="/admin/home" onClick={() => this.lnkLogoutClick()} className="logout-link">Logout</Link>
        </div>

      </div>
    </div>
  );
}

  // event handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}

export default Menu;
