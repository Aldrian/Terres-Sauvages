import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class LoginUser extends React.Component {

  static propTypes = {
    signinUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      //this.props.router.replace('/')
    }

    return (
      <div className=''>
        <h2>Log In</h2>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className=''
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            className=''
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />

          {this.state.email && this.state.password &&
          <button className='' onClick={this.signinUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  signinUser = () => {
    const {email, password} = this.state

    this.props.signinUser({variables: {email, password}})
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        //this.props.router.replace('/')
      }).catch((e) => {
        console.error(e)
        //this.props.router.replace('/')
      })
  }
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) { 
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(signinUser, {name: 'signinUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(withRouter(LoginUser))
)