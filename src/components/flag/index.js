import {deleteCurrentFlagAction} from '../../store/actions/flags'
import {connect} from 'react-redux'
import Flag from './flag'

const mapStateToProps = state => ({
  data: state.flags
})

const mapDispatchToProps = dispatch => {
  return {
    deleteFlag: () => dispatch(deleteCurrentFlagAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flag)
