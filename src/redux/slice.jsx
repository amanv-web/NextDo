import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: [],

  reducers: {
    add(state, action) {
      state.push({ ...action.payload, isEditing: false }); 
    },

    remove(state, action) {
      return state.filter((todo) => todo.id !== action.payload.id);
    },

    edit(state, action) {
      const { id, text } = action.payload;
      const index = state.findIndex((todo) => todo.id === id); 
      if (index !== -1) {
        state[index].text = text;
        state[index].isEditing = false; 
      }
    },
    toggleDone: (state, action) => {
      const task = state.find(todo => todo.id === action.payload.id);
      if (task) {
        task.done = !task.done;
      }
    }}
    
});

export const { add, remove, edit ,toggleDone } = todoSlice.actions;

export default todoSlice.reducer;
