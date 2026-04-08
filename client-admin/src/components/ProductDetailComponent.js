import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: "",
      txtName: "",
      txtPrice: 0,
      cmbCategory: "",
      imgProduct: "",
    };
  }

  render() {
    const categories = this.state.categories.map((cate) => (
      <option key={cate._id} value={cate._id}>
        {cate.name}
      </option>
    ));

    return (
      <div className="product-detail-form"> {/* Dùng class đã tạo ở App.css */}
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <div className="admin-form-group">
            <label>ID</label>
            <input type="text" value={this.state.txtID} readOnly={true} />
          </div>

          <div className="admin-form-group">
            <label>Name</label>
            <input
              type="text"
              value={this.state.txtName}
              onChange={(e) => this.setState({ txtName: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Price</label>
            <input
              type="number"
              value={this.state.txtPrice}
              onChange={(e) => this.setState({ txtPrice: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Image</label>
            <input
              type="file"
              name="fileImage"
              accept="image/jpeg, image/png, image/gif"
              onChange={(e) => this.previewImage(e)}
            />
          </div>

          <div className="admin-form-group">
            <label>Category</label>
            {/* Trong React, giá trị chọn nằm ở thẻ select, không phải selected ở option */}
            <select 
              value={this.state.cmbCategory} 
              onChange={(e) => this.setState({ cmbCategory: e.target.value })}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories}
            </select>
          </div>

          <div className="img-preview-admin">
            <img
              src={this.state.imgProduct ? this.state.imgProduct : "https://via.placeholder.com/300"}
              alt="Preview"
            />
          </div>

          <div className="btn-group">
            <button className="btn-category btn-add" onClick={(e) => this.btnAddClick(e)}>ADD NEW</button>
            <button className="btn-category btn-update" onClick={(e) => this.btnUpdateClick(e)}>UPDATE</button>
            <button className="btn-category btn-delete" onClick={(e) => this.btnDeleteClick(e)}>DELETE</button>
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // FIX LỖI: Kiểm tra null trước khi setState
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      if (this.props.item) {
        this.setState({
          txtID: this.props.item._id,
          txtName: this.props.item.name,
          txtPrice: this.props.item.price,
          cmbCategory: this.props.item.category._id,
          imgProduct: "data:image/jpg;base64," + this.props.item.image,
        });
      } else {
        // Reset form khi không chọn item nào (thêm mới)
        this.setState({
          txtID: "",
          txtName: "",
          txtPrice: 0,
          cmbCategory: "",
          imgProduct: "",
        });
      }
    }
  }

  // --- Handlers ---
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const { txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, "");
    
    if (txtName && txtPrice && cmbCategory && image) {
      const prod = { name: txtName, price: parseInt(txtPrice), category: cmbCategory, image: image };
      this.apiPostProduct(prod);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin và chọn ảnh!");
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, "");

    if (txtID && txtName && txtPrice && cmbCategory && image) {
      const prod = { name: txtName, price: parseInt(txtPrice), category: cmbCategory, image: image };
      this.apiPutProduct(txtID, prod);
    } else {
      alert("Vui lòng chọn sản phẩm cần cập nhật!");
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm("BẠN CÓ CHẮC CHẮN MUỐN XÓA?")) {
      const id = this.state.txtID;
      if (id) this.apiDeleteProduct(id);
    }
  }

  // --- APIs ---
  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      this.setState({ categories: res.data });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/admin/products", prod, config).then((res) => {
      if (res.data) {
        alert("THÊM THÀNH CÔNG!");
        this.apiGetProducts();
      } else {
        alert("THẤT BẠI!");
      }
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/products/" + id, prod, config).then((res) => {
      if (res.data) {
        alert("CẬP NHẬT THÀNH CÔNG!");
        this.apiGetProducts();
      } else {
        alert("CẬP NHẬT THẤT BẠI!");
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.delete("/api/admin/products/" + id, config).then((res) => {
      if (res.data) {
        alert("XÓA THÀNH CÔNG!");
        this.apiGetProducts();
      } else {
        alert("XÓA THẤT BẠI!");
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/products?page=" + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products && result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else if (this.props.curPage > 1) {
        // Nếu xóa hết ở trang hiện tại thì lùi về trang trước
        axios.get("/api/admin/products?page=" + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }
}

export default ProductDetail;