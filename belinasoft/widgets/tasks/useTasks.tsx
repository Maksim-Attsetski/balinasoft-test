import { Service } from '@/global';
import React, { useState } from 'react';
import { ITask } from './types';
import { useTasksStore } from './store';
import { useAuth } from '../auth/useAuth';

const taskService = new Service('tasks');

export const useTasks = () => {
  const store = useTasksStore();
  const { user } = useAuth();
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  const onGetMyTasks = async () => {
    if (!user?.id) return;

    try {
      setIsTaskLoading(true);
      const response = await taskService.getAll<ITask>();
      const { data, error } = await taskService.getByUserId<ITask>(user?.id);
      console.log(data, response.data);

      if (error) throw new Error(error?.message);

      if (data) {
        store.setTasks(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  const onCreateTask = async (newTask: ITask) => {
    try {
      setIsTaskLoading(true);
      const { data, error } = await taskService.create<ITask>(newTask);

      if (error) throw new Error(error?.message);

      if (data && data[0]) {
        store.createTask(data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  const onUpdateTask = async (task: ITask, id: number) => {
    try {
      setIsTaskLoading(true);
      const { error } = await taskService.update<ITask>(id + '', task);

      if (error) throw new Error(error?.message);

      store.updateTask({ ...task, id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  const onDeleteTask = async (id: number) => {
    try {
      setIsTaskLoading(true);
      const { error } = await taskService.delete(id + '');

      if (error) throw new Error(error?.message);

      store.deleteTask(id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  return {
    tasks: store.tasks,
    onCreateTask,
    onDeleteTask,
    onGetMyTasks,
    onUpdateTask,
    isTaskLoading,
  };
};
