import React from 'react'
import AppTemplate from './templates/AppTemplate'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Work from '../lib/index'
require('node_modules/collaborate/build/index.css')

class Lists extends React.Component {
  render () {
    return (
      <Router>
        <AppTemplate>
          <Switch>
            <Route exact path='/' component={() => (<h1>overview</h1>)} />
            <Route path='/work' component={() => <Work />} />
            <Route path='/validate' component={() => (<h1>validate</h1>)} />
            <Route component={() => <h1>no way</h1>} />
          </Switch>
        </AppTemplate>
      </Router>
    )
  }
}

export default Lists
