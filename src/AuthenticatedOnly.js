import React from 'react'

class AuthenticatedOnly extends React.Component {
  render () {
    let isLoggedIn = localStorage.getItem('oce_token')
    return (isLoggedIn ? this.props.children : this.props.unauthenticatedComponent)
  }
}

export default AuthenticatedOnly
