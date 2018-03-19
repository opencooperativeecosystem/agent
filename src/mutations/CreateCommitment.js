import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const createCommitment = gql`
mutation ($token: String!, $committedUnitId:Int!, $due:String!, $action: String!, $scopeId: Int, $note: String, $committedNumericValue: String!, $committedResourceClassificationId: Int!, $providerId: Int) {
  createCommitment(token: $token, committedUnitId:$committedUnitId, due:$due, action: $action, note: $note, committedResourceClassificationId: $committedResourceClassificationId, scopeId: $scopeId, committedNumericValue: $committedNumericValue, providerId: $providerId) {
    commitment {
      id
      action
      plannedStart
      due
      provider {
        name
      }
      scope {
        name
      }
      resourceClassifiedAs {
        name
      }
      committedQuantity {
        numericValue
        unit {
          name
        }
      }
      committedOn
      isFinished
      note
    }
  }
}
`

export default graphql(createCommitment, {options: (props) => ({ variables: {token: localStorage.getItem('token')}})})
