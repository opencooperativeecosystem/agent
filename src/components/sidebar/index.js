import {compose,withState, withHandlers} from 'recompose'
import Component from './sidebar'


export default compose(
  withState('isOpen', 'togglePopup', ''),
  withHandlers({
    // onTogglePopup: props => (popup) => {
    //   props.togglePopup(popup)
    // },
    onCreatePlanFromRecipe: props => event => {
      props.toggleCreatePlanFromRecipe(!props.createPlanFromRecipe)
    },
    logout: props => event => {
      localStorage.removeItem('oce_token')
      window.location.reload()
    },
  })
)(Component)
