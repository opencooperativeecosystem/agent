import gql from 'graphql-tag'

export default gql`
  query {
    notification @client {
        id
        message
        type
    }
  }
`
  