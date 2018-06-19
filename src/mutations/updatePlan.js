import gql from 'graphql-tag';

const updatePlan = gql`
mutation ($token: String!, $id: Int!, $name: String, $note: String) {
    updatePlan(token: $token, id:$id, name: $name, note: $note) {
      plan {
        id
        name
        due
        note
      }
    }
  }
`;

export default updatePlan
