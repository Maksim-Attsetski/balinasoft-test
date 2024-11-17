import { create } from 'zustand';
import { ITask } from './types';

interface ITasksStore {
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  createTask: (task: ITask) => void;
  updateTask: (task: ITask) => void;
  deleteTask: (id: number) => void;
}

export const useTasksStore = create<ITasksStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => ({ tasks }),
  createTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id === id),
    })),
}));
