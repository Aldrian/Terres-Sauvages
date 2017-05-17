import React, { Component } from 'react';
import CreateUser from '../../components/signup/CreateUser'
import LoginUser from '../../components/signup/LoginUser'
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <CreateUser/>
        <LoginUser/>
      </div>
    );
  }
}

export default Login;


