import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login/'
import Settings from './settings/wrapper'
import registerServiceWorker from './registerServiceWorker'
import {HashRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {client, store} from './store'
import { Provider } from 'react-redux'
import AppTemplate from './templates/AppTemplate'
import { Notifs } from 'redux-notifications'
import style from './base.css'
import Work from 'collaborate'
import './App.css'
import 'collaborate/build/css/index.css'
// require("react-datepicker/dist/react-datepicker-cssmodules.css")

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
        <AppTemplate>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={() => (<h1>overview</h1>)} />
          <Route path='/work' component={Work} />
          <Route path='/validate' component={() => (<h1>validate</h1>)} />
          <Route path='/settings' component={Settings} />
        </AppTemplate>
        </div>
      </Router>
    </Provider>
  </ApolloProvider>,
document.getElementById('root')
)
registerServiceWorker()
