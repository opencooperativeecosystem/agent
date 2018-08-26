import React from 'react'
import Component from './index'
import {compose} from 'recompose'
import { Icons, Button, Panel } from "oce-components/build";
import style from "./style.css";


class NetworkWrapper extends React.Component {
  render () {
    return (
      <div className={style.container}>
        <div className={style.validation}>
          <Panel
            large
            icon={<Icons.Globe width="18" color="#f0f0f0" />}
            title={'Network'}
          >
            <Component />
          </Panel>
        </div>
      </div>
    )
  }
}

export default compose(
  // graphql(orgsQuery, {
  //   options: (props) => ({ variables: {
  //     token: localStorage.getItem('oce_token')
  //   }}),
  //   props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
  //     orgsloading: loading,
  //     orgserror: error,
  //     refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
  //     orgs: viewer ? viewer.fcOrganizations : null
  // })}),
  // graphql(agentQuery, {
    // options: (props) => ({ variables: {
    //   token: localStorage.getItem('oce_token')
    // }}),
    // props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
    //   loading: loading,
    //   error: error,
    //   refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
    //   data: viewer ? viewer.myAgent : null
    // })}
)(NetworkWrapper)
