import gql from 'graphql-tag';

export const defaults = {
    notifications: [],
  };


let nextNotifId = 0;

export const resolvers = {
  Mutation: {
    addNotification: (_, {message, type}, {cache}) => {
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
        id: nextNotifId++,
        message,
        type,
        __typename: 'Notification'
      }
      const data = {
        notifications: previousState.notifications.concat([newNotif])
      }
      cache.writeQuery({query, data: data})
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
    }
  }
}