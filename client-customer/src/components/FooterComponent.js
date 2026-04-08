import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link để chuyển trang mượt mà

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        {/* PHẦN NỘI DUNG CHÍNH: Lan nền đen full ngang, nội dung ở giữa */}
        <div className="container"> 
          <div className="footer-container">
            {/* CỘT 1: GIỚI THIỆU */}
            <div className="footer-section">
              <h3>SHOP ONLINE</h3>
              <p>Website bán hàng uy tín chất lượng, cập nhật xu hướng công nghệ mới nhất 2026.</p>
            </div>

            {/* CỘT 2: LIÊN KẾT NHANH */}
            <div className="footer-section">
              <h4>Liên kết</h4>
              <ul className="footer-links">
                <li><Link to="/home">Trang chủ</Link></li>
                <li><Link to="/product/category/all">Sản phẩm</Link></li>
                <li><Link to="/mycart">Giỏ hàng</Link></li>
              </ul>
            </div>

            {/* CỘT 3: THÔNG TIN LIÊN HỆ */}
            <div className="footer-section">
              <h4>Liên hệ</h4>
              <p>📧 Email: support@gmail.com</p>
              <p>📞 Phone: 0123456789</p>
              <p>📍 Địa chỉ: TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>
        </div>

        {/* PHẦN BẢN QUYỀN (FOOTER BOTTOM): Lan nền đen đậm full ngang */}
        <div className="footer-bottom">
          <div className="container">
            © 2026 SHOP ONLINE | Designed with ❤️ by <b>Huynh Minh Tri</b> 😎
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;