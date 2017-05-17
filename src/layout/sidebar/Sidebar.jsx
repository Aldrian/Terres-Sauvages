import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;


