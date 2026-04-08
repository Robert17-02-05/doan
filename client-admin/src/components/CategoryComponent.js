import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => (
      <tr key={item._id} className="datatable" onClick={() => this.trClick(item)}>
        <td>{item._id}</td>
        <td>{item.name}</td>
      </tr>
    ));

    return (
      <div className="container">
        <h2 className="admin-title">CATEGORY LIST</h2>
        <div className="admin-content-section">
          <table className="datatable">
            <thead>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{cates}</tbody>
          </table>
        </div>

        {/* Gọi Component Con và truyền dữ liệu qua Props */}
        <CategoryDetail 
          item={this.state.itemSelected} 
          updateCategories={this.updateCategories} 
        />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  updateCategories = (categories) => { 
    this.setState({ categories: categories });
  }
}
export default Category;