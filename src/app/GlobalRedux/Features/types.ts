// src/types.ts
export interface Task {
    id: number;
    name: string;
  }
  
  export interface AppState {
    tasks: Task[];
  }
  
  export const ADD_TASK = 'ADD_TASK';
  export const REMOVE_TASK = 'REMOVE_TASK';
  
  interface AddTaskAction {
    type: typeof ADD_TASK;
    payload: Task;
  }
  
  interface RemoveTaskAction {
    type: typeof REMOVE_TASK;
    payload: number;
  }
  
  export type TaskActionTypes = AddTaskAction | RemoveTaskAction;
  