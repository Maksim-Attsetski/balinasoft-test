import React, { useEffect, useMemo, useRef, useState } from 'react';

import { FlatList, View } from 'react-native';
import { Gap, Layout, Text } from '@/components';
import { ITask, Task, TaskFilterModal, useTasks } from '@/widgets';
import BottomSheet from '@gorhom/bottom-sheet';

export default function HomeScreen() {
  const { tasks, onGetMyTasks, isTaskLoading } = useTasks();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sortBy, setSortBy] = useState<keyof ITask>('created_at');
  const [showOnly, setShowOnly] = useState<keyof ITask>('id');

  const sortTaskBy = (a: ITask, b: ITask): number => {
    switch (sortBy) {
      case 'created_at':
        return (
          new Date(a.created_at).getMilliseconds() -
          new Date(b.created_at).getMilliseconds()
        );
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return -1;
    }
  };

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => !!task[showOnly])
      .sort((a, b) =>
        // 1. pin -> latest. done -> sort by
        a.is_pinned ? -1 : a.is_done ? 1 : sortTaskBy(a, b)
      );
  }, [tasks, sortBy, showOnly]);

  useEffect(() => {
    onGetMyTasks();
  }, []);

  return (
    <Layout>
      <TaskFilterModal
        sortBy={sortBy}
        setSortBy={setSortBy}
        bottomSheetRef={bottomSheetRef}
        showOnly={showOnly}
        setShowOnly={setShowOnly}
      />
      <Gap />
      <FlatList
        refreshing={isTaskLoading}
        data={sortedTasks}
        renderItem={({ item }) => <Task task={item} />}
        ListEmptyComponent={() => (
          <View>
            <Text>Упс...</Text>
            <Text>Тут пока что пусто</Text>
            <Text>Вы можете добавить задачу по кнопке выше</Text>
          </View>
        )}
        ItemSeparatorComponent={Gap}
      />
      <Gap />
    </Layout>
  );
}
