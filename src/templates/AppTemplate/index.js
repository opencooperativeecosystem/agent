import * as React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import AuthenticatedOnly from '../../AuthenticatedOnly'
import Login from '../../login/'
import style from './style.css'
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
 } from 'react-router'
import Flag from '../../components/flag'
import Sidebar from '../../components/sidebar'


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );


// class AuthenticatedOnly extends React.Component {
//   render () {
//     let isLoggedIn = localStorage.getItem('oce_token')
//     return (isLoggedIn ? this.props.children : this.props.unauthenticatedComponent)
//   }
// }


const AppTemplate = ({component: Component, ...rest}) => {
  let isLoggedIn = localStorage.getItem('oce_token')
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          rest.loading ? <strong>Loading...</strong> : (
            rest.error ? <p style={{ color: '#F00' }}>API error</p> : (
              <div >
                <Flag />
                <Sidebar data={rest.data} agents={rest.data.agentRelationships} />
                <div className={style.container}>
                  <Component {...props} />
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

// class AppTemplate extends React.Component {
//   render () {
//     const {data, loading, error, children} = this.props
//     console.log('ciao')
//     console.log(error)
//     return (
//       <AuthenticatedOnly unauthenticatedComponent={<Login />}>
//         {loading ? <strong>Loading...</strong> : (
//           error ? <p style={{ color: '#F00' }}>API error</p> : (
//             <div >
//               <Flag />
//               <Sidebar data={data} agents={data.agentRelationships} />
//               <div className={style.container}>
//                 {children}
//               </div>
//             </div>
//           ))}
//       </AuthenticatedOnly>
//     )
//   }
// }

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
    token: localStorage.getItem('oce_token')
  }}),
  props: ({ownProps, data: {viewer, loading, error, refetch}}) => ({
    loading,
    error,
    refetch,
    data: viewer ? viewer.myAgent : null
  })
})(App)
