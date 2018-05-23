import {compose, withHandlers} from 'recompose'
import Component from './sidebar'

export default compose(
    withHandlers({
      logout: props => event => {
        localStorage.removeItem('oce_token')
        window.location.reload()
      }
    })
  )(Component)
