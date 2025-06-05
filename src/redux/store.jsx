import { configureStore } from '@reduxjs/toolkit'
import { todoSlice } from './slice'

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

export default store