export const flags = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FLAG': {
        return action.payload
      }
      case 'DELETE_CURRENT_FLAG': {
        return []
      }
      default: {
        return state
      }
    }
}
