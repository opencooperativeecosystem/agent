import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login/'
import { Query, graphql } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { compose } from "recompose";
import {ApolloProvider} from 'react-apollo'
import {client} from './store'
import AppTemplate from './templates/AppTemplate'
import style from './base.css'
import {PrivateRoute} from './helpers/router'
import {Notifications} from 'oce-components/build'
import getNotification from './queries/getNotifications';
import updateNotification from "./mutations/updateNotification";
import deleteNotification from "./mutations/deleteNotification";
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

const NotificationsTemplate = (props) => {
  return (
  <div className={style.genericAlert}>
    <Notifications 
      notifications={props.notifications} 
      dismiss={props.deleteNotification}
    />
    </div>
)}

const EhnanchedNotifications = compose(
  graphql(updateNotification, {name: 'updateNotification'}),
  graphql(deleteNotification, {name: 'deleteNotification'}),
)(NotificationsTemplate)

ReactDOM.render(
  <ApolloProvider client={client}>
      <Router>
        <div className={style.body}>
          <Query query={getNotification}>
            {({ data: {notifications} }) => {
              return (
                <EhnanchedNotifications notifications={notifications}/>
            )}}
          </Query>
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={AppTemplate} redirectTo='/login' />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
  </ApolloProvider>,
document.getElementById('root')
)
registerServiceWorker()
