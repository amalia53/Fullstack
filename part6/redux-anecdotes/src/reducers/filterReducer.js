import { createSlice } from '@reduxjs/toolkit'

const initialState = 'ALL'

const filterSlice = createSlice({
  name: 'filteringAnecdotes',
  initialState,
  reducers: {
    filter(state, action) {
      const filterWord = action.payload
      return filterWord
    }
  }
})

export const { filter } = filterSlice.actions
export default filterSlice.reducer