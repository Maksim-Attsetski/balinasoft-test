import React, { useMemo, useRef, useState } from 'react';

import { FlatList, View } from 'react-native';
import { Button, Flex, Gap, Layout, Text } from '@/components';
import { ITask, Task, TaskFilterModal, useTasks } from '@/widgets';
import BottomSheet from '@gorhom/bottom-sheet';

export default function HomeScreen() {
  const { tasks, onGetMyTasks, isTaskLoading } = useTasks();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sortBy, setSortBy] = useState<keyof ITask>('created_at');

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
    return [...tasks].sort((a, b) =>
      // 1. pin -> latest. done -> sort by
      a.is_pinned ? -1 : a.is_done ? 1 : sortTaskBy(a, b)
    );
  }, [tasks, sortBy]);

  return (
    <Layout>
      <Flex>
        <Button
          to={{
            pathname: '/(routes)/task-action',
          }}
          full
          size='small'
          type='primary'
        >
          Добавить задачу
        </Button>
        <Gap />
        <Button
          full
          size='small'
          type='secondary'
          btnProps={{
            onPress: () => bottomSheetRef?.current?.snapToIndex?.(0),
          }}
        >
          Показать фильтры
        </Button>
      </Flex>
      <Gap />
      <FlatList
        refreshing={isTaskLoading}
        onRefresh={onGetMyTasks}
        data={sortedTasks}
        renderItem={({ item }) => <Task task={item} />}
        ListEmptyComponent={() => (
          <View>
            <Text>У вас еще нет задач</Text>
          </View>
        )}
        ItemSeparatorComponent={Gap}
      />
      <Gap />
      <TaskFilterModal
        sortBy={sortBy}
        setSortBy={setSortBy}
        bottomSheetRef={bottomSheetRef}
      />
    </Layout>
  );
}
