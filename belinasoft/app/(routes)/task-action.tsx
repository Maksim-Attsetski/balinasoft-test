import { memo, useState } from 'react';

import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Button, Gap, Input, Text } from '@/components';
import { StyleSheet, View } from 'react-native';
import { ITask, useTasks } from '@/widgets';

const TaskAction = () => {
  const item = useLocalSearchParams();

  const [name, setName] = useState<string>((item?.name as string) ?? '');
  const [description, setDescription] = useState<string>(
    (item?.description as string) ?? ''
  );
  const { onCreateTask } = useTasks();

  const onPress = async () => {
    await onCreateTask({
      description,
      name,
    } as ITask);

    router.canGoBack() ? router.back() : router.replace('/');
  };

  return (
    <>
      <Gap />
      <Text title>Добавление задачи</Text>
      <Gap y={24} />

      <Input
        title='Название'
        inputProps={{ value: name, onChangeText: setName }}
      />
      <Gap />
      <Input
        title='Описание'
        inputProps={{ value: description, onChangeText: setDescription }}
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
