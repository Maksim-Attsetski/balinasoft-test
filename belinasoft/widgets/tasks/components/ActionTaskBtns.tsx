import React, { Dispatch, FC, memo, SetStateAction, useRef } from 'react';

import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import { Text, Flex, Gap, Button } from '@/components';
import { staticColors } from '@/global';
import { ITask } from '../types';
import { useTasks } from '../useTasks';

interface IProps {
  task: ITask | null;
  setTask: Dispatch<SetStateAction<ITask | null>>;
}

const ActionTaskBtns: FC<IProps> = ({ setTask, task }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { onUpdateTask, onDeleteTask } = useTasks();

  const onPressPinTask = async () => {
    if (task) {
      await onUpdateTask({ is_pinned: !task?.is_pinned } as ITask, task?.id);
      setTask((prev) =>
        prev ? { ...prev, is_pinned: !prev.is_pinned } : null
      );
    }
  };

  const onPressDoneTask = async () => {
    if (task) {
      await onUpdateTask({ is_done: !task?.is_done } as ITask, task?.id);
      setTask((prev) => (prev ? { ...prev, is_done: !prev.is_done } : null));
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
  return (
    <>
      <Flex toDown>
        <Button
          btnProps={{ onPress: onPressPinTask }}
          full
          type={task?.is_pinned ? 'primary' : 'common'}
        >
          📌
        </Button>
        <Button
          btnProps={{ onPress: onPressDoneTask }}
          full
          type={task?.is_done ? 'primary' : 'common'}
        >
          ✔️
        </Button>
        <Button
          full
          btnProps={{ onPress: onPressEditTask, disabled: task?.is_done }}
        >
          ✏️
        </Button>
        <Button
          full
          btnProps={{ onPress: () => bottomSheetRef.current?.snapToIndex(0) }}
        >
          🗑️
        </Button>
      </Flex>
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
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: staticColors.common.bg,
  },
});
export default memo(ActionTaskBtns);
