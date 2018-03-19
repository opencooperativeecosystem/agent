import {compose, withHandlers, withState} from 'recompose'
import Component from './sidebar'

export default compose(
    withState('panel', 'togglePanel', false),
    withState('profile', 'toggleProfile', false),
    withHandlers({
      handleTogglePanel: props => event => {
        props.togglePanel(!props.panel)
      },
      handleToggleProfilePanel: props => event => {
        props.toggleProfile(!props.profile)
      },
      logout: props => event => {
        localStorage.removeItem('token')
        window.location.reload()
      }
    })
  )(Component)
