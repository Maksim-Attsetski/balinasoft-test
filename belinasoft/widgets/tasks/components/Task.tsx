import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { ITask } from '../types';
import { Text } from '@/components';

interface IProps {
  task: ITask;
}

const Task: FC<IProps> = ({ task }) => {
  return (
    <View>
      <Text>
        {task.id}. {task.name}
      </Text>
      <Text>{task.description}</Text>
      <Text>{task.created_at}</Text>
    </View>
  );
};

export default memo(Task);
