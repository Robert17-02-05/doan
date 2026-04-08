import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // --- APIs ---
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      this.setState({ product: res.data });
    });
  }

  // --- Event Handlers ---
  btnAdd2CartClick(e) {
    e.preventDefault();
    const { product, txtQuantity } = this.state;
    const quantity = parseInt(txtQuantity);

    if (quantity > 0 && product) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);

      if (index === -1) {
        // Thêm mới nếu chưa có trong giỏ
        mycart.push({ product: product, quantity: quantity });
      } else {
        // Tăng số lượng nếu đã tồn tại
        mycart[index].quantity += quantity;
      }

      this.context.setMycart(mycart);
      alert('Đã thêm vào giỏ hàng thành công! 🎉');
    } else {
      alert('Vui lòng nhập số lượng hợp lệ.');
    }
  }

  render() {
    const prod = this.state.product;

    // Hiển thị trạng thái loading nếu dữ liệu chưa về
    if (!prod) {
      return <div className="text-center mt-5">Đang tải chi tiết sản phẩm...</div>;
    }

    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">CHI TIẾT SẢN PHẨM</h2>
        
        <div className="detail-container">
          {/* Khối hình ảnh */}
          <div className="product-image-wrapper">
            <img
              src={prod.image ? "data:image/jpg;base64," + prod.image : ""}
              alt={prod.name}
              className="img-fluid rounded"
            />
          </div>

          {/* Khối thông tin */}
          <div className="detail-info">
            <h2 className="display-6 fw-bold">{prod.name}</h2>
            <p className="price-tag text-danger fs-3 fw-bold">
              {prod.price.toLocaleString()} đ
            </p>
            <hr />
            <div className="product-specs">
              <p><strong>Mã SP:</strong> {prod._id}</p>
              <p><strong>Danh mục:</strong> {prod.category.name}</p>
            </div>

            <div className="buy-section mt-4 p-3 bg-light rounded">
              <div className="d-flex align-items-center mb-3">
                <label className="me-3 fw-bold">Số lượng:</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: '80px' }}
                  min="1"
                  max="99"
                  value={this.state.txtQuantity}
                  onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                />
              </div>
              <button 
                className="btn btn-warning btn-lg w-100 shadow-sm"
                onClick={(e) => this.btnAdd2CartClick(e)}
              >
                🛒 Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetail);