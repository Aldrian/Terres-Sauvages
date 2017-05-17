import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Footer.css';


const userQuery = gql`
  query {
    user {
      id
      username
    }
  }
`;

class Footer extends Component {
  
  logout() {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken');
  }

  render() {
    const {user} = this.props;
    
    return (
      <div className="Footer">
        {user ? (<p><button onClick={this.logout()}>Logout</button></p>) : (<p>Not connected <Link to='/login'>Login</Link></p>)}
      </div>
    );
  }
}

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(Footer);
