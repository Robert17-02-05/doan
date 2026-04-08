import React, { Component } from "react";

class Footer extends Component {
  render() {
  return (
    <div className="footer">
      <div className="container"> {/* Giữ các cột thông tin ở giữa */}
        <div className="footer-container">
          <div className="footer-section">
            <h3 style={{color: '#ff9800', marginBottom: '15px'}}>SHOP ONLINE</h3>
            <p style={{color: '#bbb', fontSize: '14px'}}>Website quản trị hệ thống bán hàng chuyên nghiệp.</p>
          </div>
          <div className="footer-section">
            <h4 style={{color: '#ff9800', marginBottom: '15px'}}>LIÊN KẾT</h4>
            <p style={{color: '#bbb', fontSize: '14px'}}>Trang chủ Admin</p>
            <p style={{color: '#bbb', fontSize: '14px'}}>Quản lý sản phẩm</p>
          </div>
          <div className="footer-section">
            <h4 style={{color: '#ff9800', marginBottom: '15px'}}>LIÊN HỆ</h4>
            <p style={{color: '#bbb', fontSize: '14px'}}>Email: admin@shop.com</p>
            <p style={{color: '#bbb', fontSize: '14px'}}>Phone: 0123456789</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 ADMIN PANEL | Designed by Huynh Minh Tri 😎
      </div>
    </div>
  );
}
}

export default Footer;