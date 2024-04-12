import { createSlice } from '@reduxjs/toolkit'

const initialState = 'No notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log(state)
      console.log(action.payload)
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer