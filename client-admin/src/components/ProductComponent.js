import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; 
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }

  render() {
    const prods = this.state.products.map((item) => (
      // SỬA TẠI ĐÂY: Đổi trClick thành trItemClick cho khớp với bên dưới
      <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.price.toLocaleString()} đ</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.category ? item.category.name : 'N/A'}</td>
        <td>
          <img src={"data:image/jpg;base64," + item.image} width="70px" height="70px" alt="" style={{borderRadius: '5px'}} />
        </td>
      </tr>
    ));

    const pagination = Array.from({ length: this.state.noPages }, (_, index) => (
      <span 
        key={index} 
        className={this.state.curPage === index + 1 ? "current-page" : "page-link"} 
        onClick={() => this.lnkPageClick(index + 1)}
      >
         {index + 1}
      </span>
    ));

    return (
      <div className="container">
        <h2 className="admin-title">PRODUCT LIST</h2>
        <div className="admin-content-section">
          <table className="datatable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>{prods}</tbody>
          </table>
        </div>

        <div className="pagination">
          {pagination}
        </div>

        <ProductDetail 
          item={this.state.itemSelected} 
          curPage={this.state.curPage} 
          updateProducts={this.updateProducts} 
        />
      </div>
    );
  }

  // --- CÁC HÀM XỬ LÝ (Sử dụng Arrow Function để không bị lỗi 'this') ---

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  // Event-handlers
  lnkPageClick = (index) => {
    this.apiGetProducts(index);
  }

  trItemClick = (item) => {
    this.setState({ itemSelected: item });
  }

  // APIs
  apiGetProducts = (page) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ 
        products: result.products, 
        noPages: result.noPages, 
        curPage: result.curPage 
      });
    }).catch((err) => {
      console.error("Lỗi lấy sản phẩm:", err);
    });
  }
}

export default Product;