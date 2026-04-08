import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    const newprods = this.state.newprods
      ?.filter(item => item != null)
      .map((item) => (
        <div key={item._id} className="product-card">
          <Link to={"/product/" + item._id}>
            <img
              src={item.image ? "data:image/jpg;base64," + item.image : "https://via.placeholder.com/300"}
              alt={item.name}
              className="product-img"
            />
          </Link>
          <h4 className="product-name">{item.name}</h4>
          <p className="price">{item.price.toLocaleString()} đ</p>
        </div>
      ));

    const hotprods = this.state.hotprods
      ?.filter(item => item != null)
      .map((item) => (
        <div key={item._id} className="product-card">
          <Link to={"/product/" + item._id}>
            <img
              src={item.image ? "data:image/jpg;base64," + item.image : "https://via.placeholder.com/300"}
              alt={item.name}
              className="product-img"
            />
          </Link>
          <h4 className="product-name">{item.name}</h4>
          <p className="price">{item.price.toLocaleString()} đ</p>
        </div>
      ));

    return (
      <div className="container mt-4"> {/* Bọc tất cả vào 1 thẻ div cha */}
        
        {/* 🆕 SẢN PHẨM MỚI */}
        <div className="product-section">
          <h2 className="text-center mb-4">🔥 SẢN PHẨM MỚI</h2>
          <div className="product-grid">
            {newprods.length > 0 ? newprods : <p>Đang cập nhật...</p>}
          </div>
        </div>

        {/* ⭐ SẢN PHẨM HOT */}
        {this.state.hotprods.length > 0 && (
          <div className="product-section mt-5">
            <h2 className="text-center text-danger mb-4">⭐ SẢN PHẨM HOT</h2>
            <div className="product-grid">
              {hotprods}
            </div>
          </div>
        )}

      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      this.setState({ newprods: res.data });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      this.setState({ hotprods: res.data });
    });
  }
}

export default Home;