export const addFlagAction = (data) => {
  return {
    type: 'ADD_FLAG',
    payload: data
  }
}

export const deleteCurrentFlagAction = () => {
    return {
      type: 'DELETE_CURRENT_FLAG'
    }
  }
  