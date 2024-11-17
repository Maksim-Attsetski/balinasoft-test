import { memo, useMemo, useState } from 'react';

import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Button, Flex, Gap, Input, Text } from '@/components';
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

      <Flex justify='center' toDown>
        <Button full to={'../'}>
          Отменить
        </Button>
        <Button full type='primary' btnProps={{ onPress }}>
          Сохранить
        </Button>
      </Flex>
    </>
  );
};

export default memo(TaskAction);
