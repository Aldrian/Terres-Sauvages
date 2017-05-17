import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Home.css';

const userQuery = gql`
  query {
    user {
      id
      username
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p className="intro">
          Hello {this.props.data.user ? this.props.data.user.username : 'there'}
        </p>
      </div>
    );
  }
}

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(Home);


