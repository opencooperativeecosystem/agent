import React from 'react'
import AppTemplate from '../templates/AppTemplate'
import Component from './index'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {compose, withHandlers, withState} from 'recompose'
import {connect} from 'react-redux'
import { actions as notifActions } from 'redux-notifications'

const allNotificationTypes = gql`
query ($token: String) {
  viewer(token: $token) {
    allNotificationTypes {
      id
      label
      display
      description
    }
  }
}
`
const agent = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        image
        email
        note
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
            image
          }
        }
        primaryLocation {
            name
        }
        agentNotificationSettings {
          id
          send
          notificationType {
            id
            label
            display
            description
          }
        }
      }
    }
  } 
`

const updateSettings = gql`
mutation ($token: String!, $note: String, $id: Int!, $name: String,  $email: String, $image: String ) {
  updatePerson(
    token: $token,
    id: $id,
    note: $note,
    email: $email
    name: $name,
    image: $image
  ) {
    person {
      id
      name
      note
      image
    }
  }
}`

const updateNotification = gql`
mutation ($token: String!, $id: Int!, $send: Boolean!) {
  updateNotificationSetting (token: $token, id: $id, send: $send) {
    notificationSetting {
      id
      notificationType {
        id
        display
      }
      send
      agent {
        name
      }
    }
  }
}`

const createNotification = gql`
mutation ($token: String!, $agentId: Int!, $notificationTypeId: Int!, $send: Boolean! ) {
  createNotificationSetting(token: $token, notificationTypeId: $notificationTypeId, agentId: $agentId, send: $send) {
    notificationSetting {
      id
      notificationType {
        id
        label
        display
        description
      }
      send
      agent {
        name
      }
    }
  }
}`

class SettingsWrapper extends React.Component {
  render () {
    const {notificationLoading, toggleNotification, notificationError, allNotification, loading, error, data, updateImage, updateBio, saveSettings, updateLocation, updateName} = this.props
    return (
      loading || notificationLoading ? <strong>Loading...</strong> : (
        error || notificationError ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component
            allNotification={allNotification}
            data={data}
            updateImage={updateImage}
            updateLocation={updateLocation}
            updateName={updateName}
            updateBio={updateBio}
            saveSettings={saveSettings}
            toggleNotification={toggleNotification}
          />
      ))
    )
  }
}

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

const agentNotificationSettings =gql` 
  query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        agentNotificationSettings {
          id
          send
          notificationType {
            id
            label
            display
            description
          }
        }
      }
    }
  } 
  `

const WrapperConnected = compose(
    graphql(allNotificationTypes, {
      options: (props) => ({ variables: {
        token: localStorage.getItem('token')
      }}),
      props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
        notificationLoading: loading,
        notificationError: error,
        refetchNotification: refetch,  // :NOTE: call this in the component to force reload the data
        allNotification: viewer ? viewer.allNotificationTypes : null
      })
    }),
    graphql(agent, {
      options: (props) => ({ variables: {
        token: localStorage.getItem('token')
      }}),
      props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
        loading: loading,
        error: error,
        refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
        data: viewer ? viewer.myAgent : null
      })}),
    graphql(updateSettings, {
      options: (props) => ({
        variables: {
          token: localStorage.getItem('token')
        }
      }),
      props: ({ mutate, ownProps: {name, image, note, primaryLocation} }) => ({
        mutateSettings: mutate, name, image, note, primaryLocation
      })}),
      graphql(createNotification, {
        options: (props) => ({
          variables: {
            token: localStorage.getItem('token')
          },
          update: (store, { data }) => {
            let agentNotificationsCache = store.readQuery({ query: agentNotificationSettings,
              variables: {
                token: localStorage.getItem('token')
              }})

            agentNotificationsCache.viewer.myAgent.agentNotificationSettings.push({
              ...data.createNotificationSetting.notificationSetting,
              __typename: "NotificationSetting"
            })

            store.writeQuery({ query: agentNotificationSettings,
              variables: {
                token: localStorage.getItem('token')
              },
              data: agentNotificationsCache })
          }}),
        props: ({ mutate, ownProps: {agentId, send, notificationTypeId} }) => ({
          createNotification: mutate, agentId, send, notificationTypeId
        })
      }),
      // UPDATE NOTFICATION MUTATION
      graphql(updateNotification, {
        options: (props) => ({
          variables: {
            token: localStorage.getItem('token')
          }
        }),
        props: ({ mutate, ownProps: {send, id} }) => ({
          mutateNotification: mutate, send, id
        })
      }),
      withState('image', 'updateImage', ''),
      withState('name', 'updateName', ''),
      withState('email', 'updateEmail', ''),
      withState('bio', 'updateBio', ''),
      withState('location', 'updateLocation', ''),
      withHandlers({
        updateImage: props => event => {
          event.preventDefault()
          props.updateImage(event.target.value)
        },
        updateName: props => event => {
          event.preventDefault()
          props.updateName(event.target.value)
        },
        updateEmail: props => event => {
          event.preventDefault()
          props.updateEmail(event.target.value)
        },
        updateBio: props => event => {
          event.preventDefault()
          props.updateBio(event.target.value)
        },
        updateLocation: props => event => {
          event.preventDefault()
          props.updateLocation(event.target.value)
        },
        toggleNotification: (props) => (id, value, notificationId) => {
          if (id !== undefined) {
            return props.mutateNotification({
              variables: {
                send: !value,
                id: id,
                token: localStorage.getItem('token')
              }
            })
            .then((data) => props.sendNotif(Math.random(), '✌️✌️✌️ Settings updated correctly', 'success', '5000'))
            .catch((e) => props.sendNotif(Math.random(), e.message, 'danger', '5000'))
          } else {
            return props.createNotification({
              variables: {
                agentId: props.data.id,
                send: !value,
                notificationTypeId: notificationId,
                token: localStorage.getItem('token')
              }
            })
            .then((data) => props.sendNotif(Math.random(), '✌️✌️✌️ Settings updated correctly', 'success', '5000'))
            .catch((e) => props.sendNotif(Math.random(), e.message, 'danger', '5000'))
          }
        },
        saveSettings: (props) => () => {
          return (
              props.mutateSettings({
                variables: {
                  id: props.data.id,
                  name: props.name,
                  email: props.email,
                  image: props.image,
                  note: props.bio,
                  token: localStorage.getItem('token')
                }
              })
              .then((data) => props.sendNotif(Math.random(), '✌️✌️✌️ Settings updated correctly', 'success', '5000'))
              .catch((e) => {props.sendNotif(Math.random(), e.message, 'danger', '5000')})
          )
        }
    })
)(SettingsWrapper)

export default connect(mapStateToProps, mapDispatchToProps)(WrapperConnected)
