import React from "react";
import Component from "./index";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose, withState } from "recompose";
import { LoadingMini } from "../components/loading";
import allNotificationTypes from '../queries/getAllNotifications'
import updateSettings from '../mutations/updateSettings'
const agent = gql`
  query($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        agentSkills {
          id
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
`;

const updateNotification = gql`
  mutation($token: String!, $id: Int!, $send: Boolean!) {
    updateNotificationSetting(token: $token, id: $id, send: $send) {
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
  }
`;

const createNotification = gql`
  mutation(
    $token: String!
    $agentId: Int!
    $notificationTypeId: Int!
    $send: Boolean!
  ) {
    createNotificationSetting(
      token: $token
      notificationTypeId: $notificationTypeId
      agentId: $agentId
      send: $send
    ) {
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
  }
`;

class SettingsWrapper extends React.Component {
  render() {
    const {
      notificationLoading,
      toggleNotification,
      notificationError,
      allNotification,
      loading,
      error,
      data,
      id,
      name,
      note,
      email,
      image,
      saveSettings,
      active,
      toggleActivePanel,
      mutateSettings,
      mutateNotification,
      updateNotification
    } = this.props;
    return loading || notificationLoading ? (
      <LoadingMini />
    ) : error || notificationError ? (
      <p style={{ color: "#F00" }}>API error</p>
    ) : (
      <Component
        allNotification={allNotification}
        data={data}
        active={active}
        toggleActivePanel={toggleActivePanel}
        saveSettings={saveSettings}
        toggleNotification={toggleNotification}
        mutateSettings={mutateSettings}
        mutateNotification={mutateNotification}
        updateNotification={updateNotification}
        id={id}
        name={name}
        note={note}
        email={email}
        image={image}
      />
    );
  }
}

const agentNotificationSettings = gql`
  query($token: String) {
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
`;

const WrapperConnected = compose(
  withState('active', 'toggleActivePanel', 'general'),
  graphql(allNotificationTypes, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token")
      }
    }),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      notificationLoading: loading,
      notificationError: error,
      refetchNotification: refetch, // :NOTE: call this in the component to force reload the data
      allNotification: viewer ? viewer.allNotificationTypes : null
    })
  }),
  graphql(agent, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token")
      }
    }),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading: loading,
      error: error,
      refetchAgent: refetch, // :NOTE: call this in the component to force reload the data
      data: viewer ? viewer.myAgent : null
    })
  }),
  graphql(updateSettings, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token")
      }
    }),
    props: ({ mutate, ownProps: { name, image, note, primaryLocation } }) => ({
      mutateSettings: mutate,
      name,
      image,
      note,
      primaryLocation
    })
  }),
  graphql(createNotification, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token")
      },
      update: (store, { data }) => {
        let agentNotificationsCache = store.readQuery({
          query: agentNotificationSettings,
          variables: {
            token: localStorage.getItem("oce_token")
          }
        });

        agentNotificationsCache.viewer.myAgent.agentNotificationSettings.push({
          ...data.createNotificationSetting.notificationSetting,
          __typename: "NotificationSetting"
        });

        store.writeQuery({
          query: agentNotificationSettings,
          variables: {
            token: localStorage.getItem("oce_token")
          },
          data: agentNotificationsCache
        });
      }
    }),
    props: ({ mutate, ownProps: { agentId, send, notificationTypeId } }) => ({
      createNotification: mutate,
      agentId,
      send,
      notificationTypeId
    })
  }),
  // UPDATE NOTFICATION MUTATION
  graphql(updateNotification, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token")
      }
    }),
    props: ({ mutate, ownProps: { send, id } }) => ({
      mutateNotification: mutate,
      send,
      id
    })
  }),
)(SettingsWrapper);

export default WrapperConnected;
