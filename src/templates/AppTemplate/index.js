import * as React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import AuthenticatedOnly from '../../AuthenticatedOnly'
import Login from '../../login/'
import style from './style.css'
import { withRouter } from 'react-router'
import Flag from '../../components/flag'
import Sidebar from '../../components/sidebar'

class AppTemplate extends React.Component {
  render () {
    const {data, loading, error, children} = this.props
    return (
      <AuthenticatedOnly unauthenticatedComponent={<Login />}>
        {loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
            <div >
              <Flag />
              <Sidebar data={data} agents={data.agentRelationships} />
              <div className={style.container}>
                {children}
              </div>
            </div>
          ))}
      </AuthenticatedOnly>
    )
  }
}

const agentPlans = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        image
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
            image
          }
        }
        agentPlans {
          name
          id
          note
          planProcesses {
            name
            committedInputs {
              id
              note
              action
            }
            note
          }
        }
      }
    }
  }  
`
const App = withRouter(AppTemplate)

export default graphql(agentPlans, {
  options: (props) => ({variables: {
    token: localStorage.getItem('token')
  }}),
  props: ({ownProps, data: {viewer, loading, error, refetch}}) => ({
    loading,
    error,
    refetch,
    data: viewer ? viewer.myAgent : null
  })
})(App)
