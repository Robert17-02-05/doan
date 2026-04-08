import React, { Component } from 'react';
import home_img from '../asset/imgs/home_img.jpg';

class Home extends Component {
  render() {
    return (
      <div className="admin-home-container">
        <h2 className="text-center">ADMIN HOME</h2>
        <div className="image-wrapper">
          <img
            src={home_img}
            alt="Admin Home"
            className="admin-home-img"
          />
        </div>
      </div>
    );
  }
}

export default Home;