import gql from 'graphql-tag';

const updatePlan = gql`
mutation ($token: String!, $id: Int!, $name: String, $note: String, $due: String) {
    updatePlan(token: $token, id:$id, name: $name, note: $note, due: $due) {
      plan {
        id
        name
        due
        note
        plannedOn
      }
    }
  }
`;

export default updatePlan
