import React from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import {createUser, userQuery, signinUser} from '../../actions/user';

class CreateUser extends React.Component {

  static propTypes = {
    createUser: PropTypes.func.isRequired,
    signinUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
    username: '',
    emailSubscription: false,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      this.props.router.replace('/')
    }

    return (
      <div className=''>
        <h2>Create an Account</h2>
        <div className=''>
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
          <input
            className=''
            value={this.state.username}
            placeholder='Username'
            onChange={(e) => this.setState({username: e.target.value})}
          />

          {this.state.username && this.state.email && this.state.password &&
          <button className='' onClick={this.createUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  createUser = () => {
    const {email, password, username, emailSubscription} = this.state

    this.props.createUser({variables: {email, password, username, emailSubscription}})
      .then((response) => {
        this.props.signinUser({variables: {email, password}})
          .then((response) => {
            window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
            //this.props.router.replace('/')
          }).catch((e) => {
            console.error(e)
            //this.props.router.replace('/')
          })
      }).catch((e) => {
        console.error(e)
        //this.props.router.replace('/')
      })
  }
}

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(
    graphql(signinUser, {name: 'signinUser'})(
      withRouter(CreateUser))
    )
)
