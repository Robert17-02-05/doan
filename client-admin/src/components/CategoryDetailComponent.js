import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="category-detail-form">
        <h2 className="text-center">CATEGORY DETAIL</h2>
        <form>
          <div className="admin-form-group">
            <label>ID</label>
            <input type="text" value={this.state.txtID} readOnly />
          </div>
          <div className="admin-form-group">
            <label>Name</label>
            <input type="text" value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} />
          </div>
          <div className="btn-group">
            <input type="submit" value="ADD NEW" className="btn-category btn-add" onClick={(e) => this.btnAddClick(e)} />
            <input type="submit" value="UPDATE" className="btn-category btn-update" onClick={(e) => this.btnUpdateClick(e)} />
            <input type="submit" value="DELETE" className="btn-category btn-delete" onClick={(e) => this.btnDeleteClick(e)} />
          </div>
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  // event-handlers
	 btnAddClick(e) {
	   e.preventDefault();
	    const name = this.state.txtName;
	    if (name) {
	      const cate = { name: name };
	      this.apiPostCategory(cate);
	    } else {
	      alert('Please input name');
	    }
	 }
   btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
 // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('SUCCESS!');
        this.apiGetCategories();
      } else {
        alert('FAIL!');
      }
    });
  }
   apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('SUCCESS!');
        this.apiGetCategories();
      } else {
        alert('FAIL!');
      }
    });
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('SUCCESS!');
        this.apiGetCategories();
      } else {
        alert('FAIL!');
      }
    });
  }
}
export default CategoryDetail;