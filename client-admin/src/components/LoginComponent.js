import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
    };
  }

  render() {
  if (this.context.token === "") {
    return (
      <div className="admin-login-body">
        <div className="admin-login-card">
          <h2>Admin Login</h2>
          <form>
            <div className="admin-form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập..."
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu..."
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
              />
            </div>

            <button 
              type="submit" 
              className="btn-admin-login"
              onClick={(e) => this.btnLoginClick(e)}
            >
              LOGIN
            </button>
          </form>
          
          <div style={{ marginTop: '20px', fontSize: '13px', color: '#888' }}>
            © 2026 Admin Dashboard by Huynh Minh Tri
          </div>
        </div>
      </div>
    );
  }
  return null;
}
  // event handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;

    if (username && password) {
      const account = { username, password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
