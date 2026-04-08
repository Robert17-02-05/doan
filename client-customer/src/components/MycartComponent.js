import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext;

  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id}>
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td>
            <img
              src={"data:image/jpg;base64," + item.product.image}
              width="70"
              height="70"
              alt=""
            />
          </td>
          <td>{item.product.price.toLocaleString()} đ</td>
          <td>{item.quantity}</td>
          <td>
            {(item.product.price * item.quantity).toLocaleString()} đ
          </td>
          <td>
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => this.lnkRemoveClick(item.product._id)}
            >
              Xóa 🗑️
            </span>
          </td>
        </tr>
      );
    });

    return (
      <div className="container mt-4">
        <h2 className="text-center">🛒 GIỎ HÀNG</h2>

        <table border="1" width="100%">
          <thead>
            <tr>
              <th>STT</th>
              <th>ID</th>
              <th>Tên</th>
              <th>Danh mục</th>
              <th>Hình</th>
              <th>Giá</th>
              <th>SL</th>
              <th>Tổng</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.context.mycart.length > 0 ? (
              mycart
            ) : (
              <tr>
                <td colSpan="9">Giỏ hàng rỗng 🛍️</td>
              </tr>
            )}
          </tbody>
        </table>

        {this.context.mycart.length > 0 && (
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <h3>
              Tổng tiền:{" "}
              {CartUtil.getTotal(this.context.mycart).toLocaleString()} đ
            </h3>

            <button onClick={() => this.lnkCheckoutClick()}>
              Thanh toán ✅
            </button>
          </div>
        )}
      </div>
    );
  }

  // XÓA SP
  lnkRemoveClick(id) {
    const mycart = [...this.context.mycart];

    const index = mycart.findIndex(x => x.product._id === id);

    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }

  // CHECKOUT
  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;

        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }

  // API CHECKOUT
  apiCheckout(total, items, customer) {
    const body = { total, items, customer };

    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;

      if (result) {
        alert('Thanh toán thành công!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Thanh toán thất bại!');
      }
    });
  }
}

export default withRouter(Mycart);