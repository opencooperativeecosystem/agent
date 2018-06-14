import gql from 'graphql-tag';

const createPlan = gql`
mutation($token: String!, $name: String!, $due: String!, $note: String) {
  createPlan(token: $token, name: $name, due: $due, note: $note) {
    plan {
      id
      name
      due
      note
    }
  }
}
`;

export default createPlan
