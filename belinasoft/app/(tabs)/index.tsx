import React, { useEffect } from 'react';

import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Button, Gap, Layout, Text } from '@/components';
import { Task, useTasks } from '@/widgets';

export default function HomeScreen() {
  const { tasks, onGetMyTasks, isTaskLoading } = useTasks();
  console.log('tasks', tasks);

  useEffect(() => {
    onGetMyTasks();
  }, []);

  return (
    <Layout>
      <Button
        to={{
          pathname: '/(routes)/task-action',
        }}
        full={false}
      >
        Добавить задачу
      </Button>
      <Gap />
      <FlatList
        refreshing={isTaskLoading}
        data={tasks}
        renderItem={({ item }) => <Task task={item} />}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({});
