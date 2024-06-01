// src/types.ts
export interface Task {
    id: number;
    name: string;
  }
  
  export interface AppState {
    tasks: Task[];
  }
  
  // Action types
  export interface AddTaskAction {
    type: 'tasks/addTask';
    payload: Task;
  }
  
  export interface RemoveTaskAction {
    type: 'tasks/removeTask';
    payload: number;
  }
  
  export type TaskActionTypes = AddTaskAction | RemoveTaskAction;
  