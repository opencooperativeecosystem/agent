import gql from "graphql-tag";

const getUnitsQuery = gql`
  query($token: String!) {
    viewer(token: $token) {
      allUnits {
        id
        name
        symbol
      }
    }
  }
`;

export default getUnitsQuery;
