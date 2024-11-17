import { memo, useMemo, useState } from 'react';

import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Button, Gap, Input, Text } from '@/components';
import { StyleSheet, View } from 'react-native';
import { ITask, useTasks } from '@/widgets';

const TaskAction = () => {
  const item = useLocalSearchParams();

  const task = useMemo(
    () => (item?.task ? JSON.parse((item?.task ?? '') as string) : null),
    [item]
  );

  const [name, setName] = useState<string>(task?.name ?? '');
  const [description, setDescription] = useState<string>(
    task?.description ?? ''
  );
  const { onCreateTask, onUpdateTask } = useTasks();

  const onPress = async () => {
    if (task) {
      await onUpdateTask({ description, name } as ITask, task.id);
      router.replace({
        pathname: '/(routes)/task/[id]',
        params: { task: JSON.stringify({ ...task, description, name }) },
      });
    } else {
      await onCreateTask({
        description,
        name,
      } as ITask);
      router.canGoBack() ? router.back() : router.replace('/');
    }
  };

  return (
    <>
      <Gap />
      <Text title>{task ? 'Редактирование' : 'Добавление'} задачи</Text>
      <Gap y={24} />

      <Input
        title='Название'
        inputProps={{ value: name, onChangeText: setName }}
      />
      <Gap />
      <Input
        title='Описание'
        inputProps={{
          value: description,
          onChangeText: setDescription,
          multiline: true,
          numberOfLines: 7,
        }}
      />

      <View
        style={{
          marginTop: 'auto',
          marginBottom: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <Button to={'../'}>Отменить</Button>
        <Button type='primary' btnProps={{ onPress }}>
          Сохранить
        </Button>
      </View>
    </>
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
});

export default memo(TaskAction);
