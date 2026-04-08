import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Customer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [], // Danh sách đơn hàng của khách được chọn
      order: null, // Chi tiết 1 đơn hàng được chọn
    };
  }

  render() {
    // 1. Render danh sách khách hàng
    const customers = this.state.customers.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trCustomerClick(item)}>
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td className={item.active === 1 ? 'status-active' : 'status-deactive'}>
            {item.active === 1 ? 'ACTIVE ✅' : 'INACTIVE ❌'}
          </td>
          <td>
            {item.active === 0 ? (
              <span className="order-action" onClick={(e) => { e.stopPropagation(); this.lnkEmailClick(item); }}>
                SEND EMAIL 📧
              </span>
            ) : (
              <span className="order-action text-danger" onClick={(e) => { e.stopPropagation(); this.lnkDeactiveClick(item); }}>
                DEACTIVE 🚫
              </span>
            )}
          </td>
        </tr>
      );
    });

    // 2. Render danh sách đơn hàng của khách hàng đó
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trOrderClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td className="fw-bold">{item.total.toLocaleString()} đ</td>
          <td className={`status-${item.status.toLowerCase()}`}>{item.status}</td>
        </tr>
      );
    });

    // 3. Render chi tiết các sản phẩm trong 1 đơn hàng
    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>
            <img src={"data:image/jpg;base64," + item.product.image} width="60px" height="60px" alt="" style={{ borderRadius: '5px' }} />
          </td>
          <td>{item.product.price.toLocaleString()} đ</td>
          <td>{item.quantity}</td>
          <td className="fw-bold">{(item.product.price * item.quantity).toLocaleString()} đ</td>
        </tr>
      ));
    }

    return (
      <div className="container mt-4">
        {/* TẦNG 1: CUSTOMER LIST */}
        <div className="admin-content-section">
          <h2 className="admin-title">CUSTOMER LIST</h2>
          <table className="datatable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{customers}</tbody>
          </table>
        </div>

        {/* TẦNG 2: ORDER LIST (Chỉ hiện khi click vào khách hàng) */}
        {this.state.orders.length > 0 && (
          <div className="admin-content-section mt-5">
            <h2 className="admin-title">ORDER LIST BY CUSTOMER</h2>
            <table className="datatable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Creation date</th>
                  <th>Cust. name</th>
                  <th>Cust. phone</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </table>
          </div>
        )}

        {/* TẦNG 3: ORDER DETAIL (Chỉ hiện khi click vào đơn hàng) */}
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
              <tbody>{items}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  // --- Event Handlers ---
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }

  trOrderClick(item) {
    this.setState({ order: item });
  }

  lnkDeactiveClick(item) {
    if (window.confirm("BẠN CÓ CHẮC MUỐN KHÓA TÀI KHOẢN NÀY?")) {
      this.apiPutCustomerDeactive(item._id, item.token);
    }
  }

  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }

  // --- APIs ---
  apiGetCustomers() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers", config).then((res) => {
      this.setState({ customers: res.data });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders/customer/" + cid, config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/customers/deactive/" + id, body, config).then((res) => {
      if (res.data) {
        this.apiGetCustomers();
      } else {
        alert("THẤT BẠI!");
      }
    });
  }

  apiGetCustomerSendmail(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers/sendmail/" + id, config).then((res) => {
      alert(res.data.message);
    });
  }
}

export default Customer;