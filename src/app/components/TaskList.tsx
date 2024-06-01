// src/TaskList.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { addTask, removeTask } from '../GlobalRedux/Features/reducers';
import { Task } from '../GlobalRedux/Features/types';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask: Task = { id: Date.now(), name: taskName };
      dispatch(addTask(newTask));
      setTaskName('');
    }
  };

  const handleRemoveTask = (id: number) => {
    dispatch(removeTask(id));
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
