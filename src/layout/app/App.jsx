import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Home from '../home/Home.jsx';
import Profile from '../profile/Profile.jsx';
import Login from '../login/Login.jsx';
import Header from '../header/Header.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import Footer from '../footer/Footer.jsx';

const userQuery = gql`
  query {
    user {
      id
      username
    }
  }
`;

import './App.css';

class App extends Component {

  render() {
    return (
      <main className="App">
        <Header/>
        <Sidebar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/profile' component={Profile}/>
        </Switch>      
        <Footer user={this.props.data.user}/>  
      </main>
    );
  }
}

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(App);
