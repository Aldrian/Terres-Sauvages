import { gql } from 'react-apollo';

export const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
      user {
        id
        username
      }
    }
  }
`

export const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

export const createUser = gql`
  mutation createUser($email: String!, $password: String!, $username: String!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, username: $username) {
      id
    }
  }
`
