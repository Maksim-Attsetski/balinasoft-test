import React, { useEffect } from 'react';

import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text } from '@/components';
import { Task, useTasks } from '@/widgets';

export default function HomeScreen() {
  const { tasks, onGetMyTasks } = useTasks();

  useEffect(() => {
    onGetMyTasks();
  }, []);
  return (
    <Layout>
      <Text>Home</Text>
      <Text>Главная</Text>
      <FlatList data={tasks} renderItem={({ item }) => <Task task={item} />} />
    </Layout>
  );
}

const styles = StyleSheet.create({});
