import gql from 'graphql-tag';

export const defaults = {
    notifications: [],
    agentPanel: 'feed',
    plans: 'active'
  };


let nextNotifId = 0;

export const resolvers = {
  Mutation: {
    addNotification: (_, {message, type}, {cache}) => {
      let newId = nextNotifId++
      const query = gql`
      query GetNotifications {
        notifications @client {
          __typename
          id
          message
          type
        }
      }
    `
      const previousState = cache.readQuery({query})
      const newNotif = {
        id: newId,
        message,
        type,
        __typename: 'Notification'
      }
      const data = {
        notifications: previousState.notifications.concat([newNotif])
      }
      cache.writeQuery({query, data: data})
      return newNotif
    },
    deleteNotification: (_, {id}, {cache}) => {
      const query = gql`
      query GetNotifications {
        notifications @client {
          __typename
          id
          message
          type
        }
      }
    `
      const previousState = cache.readQuery({query})
      const data = {
        notifications: previousState.notifications.filter(item => item.id !== id)
      }
      cache.writeQuery({query, data})
      return data
    },
    setAgentPanel: (_, {type}, {cache}) => {
      const query = gql`
      query getAgentPanel {
        agentPanel @client
      }`
      let previousState = cache.readQuery({query})
      console.log(previousState)
      const newAgentPanel = {
        agentPanel: type
      }
      cache.writeQuery({query, data: newAgentPanel})
      let previousState2 = cache.readQuery({query})
      console.log(previousState2)
      return type
    }
  }
}