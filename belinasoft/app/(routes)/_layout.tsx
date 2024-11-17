import React from 'react';

import { Stack } from 'expo-router';
import { memo } from 'react';
import { Layout } from '@/components';

const RoutesLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_left',
        headerShown: false,
      }}
      initialRouteName='task-action'
      screenLayout={(props) => <Layout children={props.children} />}
    >
      <Stack.Screen name='task-action' />
      <Stack.Screen name='task/[id]' />
    </Stack>
  );
};

export default memo(RoutesLayout);
