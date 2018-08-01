import gql from 'graphql-tag'

export default gql`
query ($token: String, $id: Int!) {
  viewer(token: $token) {
    agent (id: $id) {
      id
      name
      image
      type
      primaryLocation {
        name
      }
      email
      note
      agentSkills {
          id
          name
      }
    }
  }
}
`
