import React, { useEffect } from 'react';

import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Layout, Text } from '@/components';
import { Task, useTasks } from '@/widgets';

export default function HomeScreen() {
  const { tasks, onGetMyTasks, isTaskLoading } = useTasks();

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
        onRefresh={onGetMyTasks}
        data={tasks}
        renderItem={({ item }) => <Task task={item} />}
        ListEmptyComponent={() => (
          <View>
            <Text>У вас еще нет задач</Text>
          </View>
        )}
        ItemSeparatorComponent={Gap}
      />
      <Gap />
    </Layout>
  );
}

const styles = StyleSheet.create({});
