import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'
import { defaults, resolvers } from "./resolvers";
import {withClientState} from 'apollo-link-state'
import {ApolloLink} from 'apollo-link'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    const dataId = object.id ? `${object.__typename}-${object.id}` : null
    return dataId},
  addTypename: true,
  fragmentMatcher
})

const stateLink = withClientState({
  cache,
  defaults: defaults,
  resolvers: resolvers
})

const link = ApolloLink.from([
  stateLink,
  new HttpLink({
  uri: 'https://ocp.freedomcoop.eu/api/graph'
  // uri: 'https://testocp.freedomcoop.eu/api/graph'
  })
])

export const client = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_CLIENT__),
  ssrMode: true,
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
  queryDeduplication: true
})

