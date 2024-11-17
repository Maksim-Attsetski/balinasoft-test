import React, { memo, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button, Gap, Text } from '@/components';
import { ActionTaskBtns, ITask } from '@/widgets';
import { Colors, staticColors } from '@/global';

const TaskAction = () => {
  const item = useLocalSearchParams();

  const [task, setTask] = useState<ITask | null>(
    JSON.parse((item?.task ?? '') as string) ?? null
  );

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
      <ActionTaskBtns task={task} setTask={setTask} />
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
