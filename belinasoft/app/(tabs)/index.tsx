import React, { useEffect } from 'react';

import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text } from '@/components';
import { Task, useTasks } from '@/widgets';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { tasks, onGetMyTasks } = useTasks();

  useEffect(() => {
    onGetMyTasks();
  }, []);
  return (
    <Layout>
      <Text>Home</Text>
      <Link
        href={{
          pathname: '/(routes)/task-action',
        }}
      >
        Добавить задачу
      </Link>
      <FlatList data={tasks} renderItem={({ item }) => <Task task={item} />} />
    </Layout>
  );
}

const styles = StyleSheet.create({});
