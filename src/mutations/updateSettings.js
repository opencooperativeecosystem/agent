import gql from 'graphql-tag';

export default gql`
mutation(
    $token: String!
    $note: String
    $id: Int!
    $name: String
    $email: String
    $image: String
  ) {
    updatePerson(
      token: $token
      id: $id
      note: $note
      email: $email
      name: $name
      image: $image
    ) {
      person {
        id
        name
        note
        image
      }
    }
  }
`