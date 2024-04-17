import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (msg, time) => {
  return async dispatch => {
    dispatch(setNotification(msg))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer