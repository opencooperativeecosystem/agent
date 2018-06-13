import gql from 'graphql-tag'

const loginMutation = gql`
mutation($username: String! $password: String!) {
  createToken(username: $username, password: $password) {
    token
  }
}
`

export default loginMutation
