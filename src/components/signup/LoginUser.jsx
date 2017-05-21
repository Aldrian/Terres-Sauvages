import React from 'react'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import {signinUser, userQuery} from '../../actions/user';

class LoginUser extends React.Component {

  static propTypes = {
    signinUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  signinUser = () => {

    const {email, password} = this.state

    this.props.signinUser({
      variables: { email, password },
      optimisticResponse: {},
      update: (store, { data: { signinUser } }) => {
        const data = store.readQuery({ query: userQuery });
        data.user = data;
        store.writeQuery({ query: userQuery, data});
      },
    })
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        //this.props.router.replace('/')
      }).catch((e) => {
        console.error(e)
        //this.props.router.replace('/')
      })
  }

  render () {

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
}

export default compose(
  graphql(signinUser, { name: 'signinUser' }),
)(withRouter(LoginUser));
