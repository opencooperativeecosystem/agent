import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import style from '../base.css'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import { actions as notifActions } from 'redux-notifications'
import {Icons, Panel} from 'oce-components/build'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.user = this.user.bind(this)
        this.password = this.password.bind(this)
        this.state = {
            username: '',
            password: '',
            isBlocking: false
        }
    }

    handleLogin = async () => {
        await this.props.mutate({variables: {username: this.state.username, password: this.state.password}})
        .then (res => {
          localStorage.setItem('oce_token', res.data.createToken.token)
          localStorage.setItem('agent_id', res.data.createToken.id)
          this.props.history.replace('/')
        })
        .catch(err => {
            this.props.sendNotif('sdasad', err.message, 'danger', '5000')
        })
    }

    user (e) {
        this.setState({
            username: e.target.value
        })    
    }

    password (e) {
        this.setState({
            password: e.target.value
        })    
    }

    render () {
      const {username, password} = this.state
      return (
          <div className={style.login_wrapper}>
            <div className={style.wrapper_title}>
              <h3><span aria-label='emoji' role='img'>🧙</span> agent.</h3>
              <h4>Your events - networked</h4>
            </div>
            <div className={style.login_container}>
            <Panel title='login' icon={<Icons.Power width='18' height='18' color='#f0f0f0' />}>
              <form
                onSubmit={event => {
                    event.preventDefault();
                    event.target.reset();
                    this.setState({
                    isBlocking: false
                    })
                    this.handleLogin()
                }}
              >
                <input placeholder='Insert your username' type='text' value={username} onChange={this.user} className='username' />
                <input placeholder='Insert your password' type='password' value={password} autoComplete="true" onChange={this.password} className='password' />
              <button>login</button>
              </form>
              <a href='https://ocp.freedomcoop.eu/account/password/reset/' target='blank' className={style.wrapper_lost}>Password lost?</a>
              <h5>Useful links</h5>
              <ul>
                  <li><a href='https://www.opencoopecosystem.net' target='blank'>Documentation</a></li>
                  <li><a href='https://t.me/ocewelcome' target='blank'>Telegram</a></li>
                  <li><a href='https://github.com/opencooperativeecosystem' target='blank'>Github</a></li>
              </ul>
            </Panel>
          </div>
        </div>
  )
  }
}


const loginMutation = gql`
mutation($username: String! $password: String!) {
    createToken(username: $username, password: $password) {
      token
    }
  }
`

// const mapStateToProps = (state) => {
//     return {
//         state: state
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     const sendNotif = (id, message, kind, dismissAfter) => {
//         notifActions.notifSend({
//             message,
//             kind,
//             id: id,
//             dismissAfter: 2000
//         })(dispatch)
//     }
//     return {
//         sendNotif
//     }
// }

// const LoginConnected = connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(Login);

const LoginWithMutation = graphql(loginMutation)(LoginConnected)


const FormikLogin = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        }
    },
    validationSchema: Yup.object().shape({
       username: Yup.string().required(),
       password: Yup.string().min(4).required()
    }),
    handleSubmit(values, {resetForm, setErrors, setSubmitting}, props) {
        props.mutate({variables: {username: this.state.username, password: this.state.password}})
        .then (res => {
          localStorage.setItem('oce_token', res.data.createToken.token)
          localStorage.setItem('agent_id', res.data.createToken.id)
        })
        .then( () => props.history.replace('/'))
        .catch(err => {
            props.sendNotif('sdasad', err.message, 'danger', '5000')
        })
    }
})(Login)


export default withRouter(LoginWithMutation)
