import * as React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import style from './style.css'
import { 
  Route,
  Redirect,
  withRouter
 } from 'react-router'
import Sidebar from '../../components/sidebar'
import {compose, withHandlers, withState} from 'recompose'

const AppTemplate = ({component: Component, ...rest, handleTogglePanel, panel}) => {
  let isLoggedIn = localStorage.getItem('oce_token')
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          rest.loading ? <strong>Loading...</strong> : (
            rest.error ? <p style={{ color: '#F00' }}>API error</p> : (
              <div className={style.surface}>
                <div className={style.content}>
                  <div className={style.boards}>
                    <div className={style.boards_main_content}>
                      <div className={style.boards_canvas}>
                        <div className={style.canvas}>
                          <Sidebar handleTogglePanel={handleTogglePanel} panel={panel} data={rest.data} agents={rest.data.agentRelationships} />
                          <div className={panel ? style.container + ' ' + style.full : style.container}>
                            <Component {...props} agentData={rest} panel={panel} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
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
      }
    }
  }  
`
const App = withRouter(AppTemplate)

export default compose(
  graphql(agentPlans, {
    options: (props) => ({variables: {
      token: localStorage.getItem('oce_token')
    }}),
    props: ({ownProps, data: {viewer, loading, error, refetch}}) => ({
      loading,
      error,
      refetch,
      data: viewer ? viewer.myAgent : null
    })
  }),
  withState('panel', 'togglePanel', true),
  withHandlers({
    handleTogglePanel: props => event => {
      props.togglePanel(!props.panel)
    }}
  )
)(App)
