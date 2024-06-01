// src/features/reducers.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, AppState } from './types';

const initialState: AppState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
