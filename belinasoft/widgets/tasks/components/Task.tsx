import React, { FC, memo } from 'react';

import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { Gap, Text } from '@/components';
import { ITask } from '../types';
import { useThemeColor } from '@/hooks';
import { Colors, staticColors } from '@/global';
import { router } from 'expo-router';

interface IProps {
  task: ITask;
}

const Task: FC<IProps> = ({ task }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/(routes)/task/[id]',
          params: { task: JSON.stringify(task) },
        })
      }
      style={[{ backgroundColor: staticColors.common.bg }, styles.container]}
    >
      <>
        <Text style={styles.title}>
          {task.name}
          {'  '}
          {task?.is_pinned ? '📌' : ''}
          {task?.is_done ? '✔️' : ''}
        </Text>
        <Gap />
        {task?.description?.length > 0 && (
          <>
            <Text style={styles.description}>{task.description}</Text>
            <Gap />
          </>
        )}
        <Text style={styles.date}>
          {new Date(task.created_at).toLocaleDateString()}
        </Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
  },
  description: {
    color: Colors.light.secondaryText,
  },
  date: {
    color: Colors.light.secondaryText,
    fontSize: 14,
    textAlign: 'right',
  },
});

export default memo(Task);
