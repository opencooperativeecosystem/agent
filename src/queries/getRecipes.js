import gql from 'graphql-tag'

export default gql`
query($token: String) {
    viewer(token: $token) {
      allRecipes {
        id
        name
        image
        category
        note
      }
    }
  }
`
