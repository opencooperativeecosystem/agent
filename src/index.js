import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login/'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {client, store} from './store'
import { Provider } from 'react-redux'
import AppTemplate from './templates/AppTemplate'
import { Notifs } from 'redux-notifications'
import style from './base.css'
import {PrivateRoute} from './helpers/router'

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

function CustomNotif (props) {
  let type
  if (props.kind === 'danger') { type = style.danger } else
  if (props.kind === 'info') { type = style.info } else
  if (props.kind === 'warning') { type = style.warning } else
  if (props.kind === 'success') { type = style.success }
  return (
    <div className={style.notification + ' ' + type}>
      <h5><span>{props.kind}</span>{props.message}</h5>
    </div>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <div>
          <Notifs
            CustomComponent={CustomNotif}
            onActionClick={id => this.dismiss(id)}
            actionLabel='close'
          />
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={AppTemplate} redirectTo='/login' />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </ApolloProvider>,
document.getElementById('root')
)
registerServiceWorker()
