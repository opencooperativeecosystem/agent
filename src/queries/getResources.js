import gql from "graphql-tag";

const getResourcesQuery = gql`
query ($token: String, $action: Action) {
  viewer(token: $token) {
    resourceClassificationsByAction(action: $action) {
      name
      category
      processCategory
      id
    }
  }
}`;

export default getResourcesQuery;
