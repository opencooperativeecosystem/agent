// import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createStore, combineReducers, compose } from 'redux'
import {flags} from './reducers/flags'
import { reducer as notifReducer } from 'redux-notifications'

import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const link = createHttpLink({
  uri: 'https://ocp.freedomcoop.eu/api/graph'
  // uri: 'https://testocp.freedomcoop.eu/api/graph'
})

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key || null,
  addTypename: true,
  fragmentMatcher
})

export const client = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_CLIENT__),
  ssrMode: true,
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
  queryDeduplication: true
})

export const store = createStore(
  combineReducers({
    notifs: notifReducer,
    flags
  }),
  compose(
    // applyMiddleware(client.middleware()),
    // eslint-disable-next-line no-underscore-dangle
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
