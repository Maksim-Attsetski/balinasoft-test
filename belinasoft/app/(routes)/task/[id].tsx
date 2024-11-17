import { memo, useRef, useState } from 'react';

import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Button, Gap, Input, Text } from '@/components';
import { StyleSheet, View } from 'react-native';
import { ITask, useTasks } from '@/widgets';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors, staticColors } from '@/global';

const TaskAction = () => {
  const item = useLocalSearchParams();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { onUpdateTask, onDeleteTask, isTaskLoading } = useTasks();

  const [task, setTask] = useState<ITask | null>(
    JSON.parse((item?.task ?? '') as string) ?? null
  );

  const onPressPinTask = async () => {
    if (task) {
      await onUpdateTask({ is_pinned: !task?.is_pinned } as ITask, task?.id);
      setTask((prev) =>
        prev ? { ...prev, is_pinned: !prev.is_pinned } : null
      );
    }
  };

  const onPressEditTask = async () => {
    router.push({
      pathname: '/(routes)/task-action',
      params: { task: JSON.stringify(task) },
    });
  };

  const onConfirmDeleteTask = async () => {
    if (!task?.id) return;

    await onDeleteTask(task?.id);
    bottomSheetRef.current?.snapToIndex(0);
    router.push('/(tabs)');
  };

  return task ? (
    <>
      <Gap />
      <Button to={'/(tabs)'}>Назад</Button>
      <Gap />
      <Text title center>
        {task?.name}
      </Text>
      <Gap y={24} />

      <Text style={styles.description}>
        {task?.description ? task?.description : 'Пустое описание...'}
      </Text>
      <Gap />
      <Text style={styles.create_at}>
        {new Date(task?.created_at).toLocaleDateString('ru')}
      </Text>
      <Gap />
      <View style={styles.btnContainer}>
        <Button
          btnProps={{ onPress: onPressPinTask }}
          full
          type={task.is_pinned ? 'primary' : 'common'}
        >
          📌
        </Button>
        <Button full btnProps={{ onPress: onPressEditTask }}>
          ✏️
        </Button>
        <Button
          full
          btnProps={{ onPress: () => bottomSheetRef.current?.snapToIndex(0) }}
        >
          🗑️
        </Button>
      </View>
      <BottomSheet
        enablePanDownToClose
        enableDynamicSizing
        ref={bottomSheetRef}
        index={-1}
        backgroundStyle={{ backgroundColor: staticColors.common.bg }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text center>Вы уверены?</Text>
          <Gap />
          <Button type='secondary' btnProps={{ onPress: onConfirmDeleteTask }}>
            Подтвердить
          </Button>
        </BottomSheetView>
      </BottomSheet>
    </>
  ) : (
    <View>
      <Text title>Нет такой задачи...</Text>
      <Gap />
      <Button to={'../'}>Назад</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 'auto',
    marginBottom: 12,
  },
  description: {
    color: Colors.light.secondaryText,
    fontSize: 16,
  },
  create_at: {
    fontSize: 16,
  },
  contentContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: staticColors.common.bg,
  },
});

export default memo(TaskAction);
