import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import MyContext from "../contexts/MyContext"; // Nhớ import Context vào đây

class Menu extends Component {
  static contextType = MyContext; // Kết nối với MyContext để lấy customer, token...

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
    };
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <Link key={item._id} to={"/product/category/" + item._id} className="nav-item">
        {item.name}
      </Link>
    ));

    return (
      <div className="header">
        {/* TOP BAR: Lan màu đen full hàng ngang */}
        <div className="top-bar">
          <div className="container">
            <div className="top-bar-left">
              {/* KIỂM TRA ĐĂNG NHẬP */}
              {this.context.customer === null ? (
                <div className="auth-links">
                  <Link to="/login">Login</Link> |{" "}
                  <Link to="/signup">Sign up</Link> |{" "}
                  <Link to="/active">Active</Link>
                </div>
              ) : (
                <div className="user-info">
                  <span>Chào <b>{this.context.customer.username}</b></span>
                  <span className="user-details"> [ID: {this.context.customer._id}]</span>
                  {/* Hiển thị Token rút gọn cho đẹp */}
                  <span className="user-details" title={this.context.token}>
                    | Token: {this.context.token.substring(0, 10)}...
                  </span>
                  <Link to="/home" onClick={() => this.lnkLogoutClick()}> | Logout</Link>
                </div>
              )}
            </div>

            <div className="top-bar-right">
              <Link to="/mycart">
                🛒 Giỏ hàng ({this.context.mycart.length})
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN NAV: Lan màu xanh full hàng ngang */}
        <div className="navbar">
          <div className="container">
            <div className="logo">
              <Link to="/">SHOP ONLINE</Link>
            </div>

            <div className="nav-links">
              <Link to="/" className="nav-item">Home</Link>
              {cates}
            </div>

            <form className="search-box" onSubmit={(e) => this.btnSearchClick(e)}>
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={this.state.txtKeyword}
                onChange={(e) => this.setState({ txtKeyword: e.target.value })}
              />
              <button type="submit">🔍</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- CÁC HÀM XỬ LÝ ---

  lnkLogoutClick() {
    this.context.setCustomer(null);
    this.context.setToken("");
    this.context.setMycart([]);
    // Có thể điều hướng về trang home
    this.props.navigate("/home");
  }

  btnSearchClick(e) {
    e.preventDefault();
    if (this.state.txtKeyword.trim()) {
      this.props.navigate("/product/search/" + this.state.txtKeyword);
    }
  }

  componentDidMount() {
    axios.get("/api/customer/categories").then((res) => {
      this.setState({ categories: res.data });
    });
  }
}

export default withRouter(Menu);