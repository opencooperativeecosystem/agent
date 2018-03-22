import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import style from '../base.css'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import { actions as notifActions } from 'redux-notifications'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.user = this.user.bind(this)
        this.password = this.password.bind(this)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = async () => {
        await this.props.mutate({variables: {username: this.state.username, password: this.state.password}})
        .then (res => {
          localStorage.setItem('oce_token', res.data.createToken.token)
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
            <div>
            <div className={style.left_section}>
              <h1>Open <br />Cooperative<br />Ecosystem</h1>
              <ul>
                  <li><a href='https://open-cooperative-ecosystem.gitbooks.io/docs/' target='blank'>Documentation</a></li>
                  <li><a href='https://t.me/ocewelcome' target='blank'>Telegram</a></li>
                  <li><a href='https://github.com/opencooperativeecosystem' target='blank'>Github</a></li>
              </ul>
            </div>
            <div className={style.right_section}>
            <div className={style.login_wrapper}>
            <div className={style.wrapper_container}>
                <div className={style.wrapper_title}><h3><span role='img'>👋</span> Welcome</h3></div>
                <input placeholder='Insert your username' type='text' value={username} onChange={this.user} className='username' />
                <input placeholder='Insert your password' type='password' value={password} onChange={this.password} className='password' />
                <button onClick={()=>this.handleLogin()}>login</button>
                <a href='https://ocp.freedomcoop.eu/account/password/reset/' target='blank' className={style.wrapper_lost}>Password lost?</a>
                </div>
            </div>
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

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    const sendNotif = (id, message, kind, dismissAfter) => {
        notifActions.notifSend({
            message,
            kind,
            id: id,
            dismissAfter: 2000
        })(dispatch)
    }
    return {
        sendNotif
    }
}

const LoginConnected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);

const LoginWithMutation = graphql(loginMutation)(LoginConnected)

export default withRouter(LoginWithMutation)
