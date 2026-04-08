import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }

  render() {
    // 1. Hiển thị danh sách Đơn hàng
    const orders = this.state.orders.map((item) => {
      return (
        <tr
          key={item._id}
          className="datatable"
          onClick={() => this.trItemClick(item)}
        >
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td className="fw-bold">{item.total.toLocaleString()} đ</td>
          {/* Thêm class màu sắc cho Status */}
          <td className={`status-${item.status.toLowerCase()}`}>
            {item.status}
          </td>
          <td>
            {item.status === "PENDING" ? (
              <div>
                <span className="order-action" onClick={(e) => { e.stopPropagation(); this.lnkApproveClick(item._id); }}>
                  APPROVE ✅
                </span>
                <span className="order-action" onClick={(e) => { e.stopPropagation(); this.lnkCancelClick(item._id); }}>
                  CANCEL ❌
                </span>
              </div>
            ) : (
              <span style={{ color: '#999' }}>No Action</span>
            )}
          </td>
        </tr>
      );
    });

    // 2. Hiển thị Chi tiết sản phẩm trong đơn hàng khi được click
    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>
            <img
              src={"data:image/jpg;base64," + item.product.image}
              width="60px"
              height="60px"
              alt=""
              style={{ borderRadius: '5px', objectFit: 'cover' }}
            />
          </td>
          <td>{item.product.price.toLocaleString()} đ</td>
          <td>{item.quantity}</td>
          <td className="fw-bold">{(item.product.price * item.quantity).toLocaleString()} đ</td>
        </tr>
      ));
    }

    return (
      <div className="container mt-4"> {/* Bọc container để căn giữa */}
        
        {/* KHỐI DANH SÁCH ĐƠN HÀNG */}
        <div className="admin-content-section">
          <h2 className="admin-title">ORDER LIST</h2>
          <table className="datatable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust. name</th>
                <th>Cust. phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
        </div>

        {/* KHỐI CHI TIẾT ĐƠN HÀNG (Chỉ hiện khi click vào 1 dòng) */}
        {this.state.order && (
          <div className="admin-content-section mt-5">
            <h2 className="admin-title">ORDER DETAIL</h2>
            <table className="datatable">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Prod. ID</th>
                  <th>Prod. name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  // --- APIs ---
  apiGetOrders() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders", config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, "APPROVED");
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, "CANCELED");
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { "x-access-token": this.context.token } };

    axios.put("/api/admin/orders/status/" + id, body, config).then((res) => {
      if (res.data) {
        alert("Cập nhật trạng thái thành công! ✅");
        this.apiGetOrders();
        this.setState({ order: null }); // Reset chi tiết sau khi cập nhật
      } else {
        alert("Cập nhật thất bại!");
      }
    });
  }
}

export default Order;