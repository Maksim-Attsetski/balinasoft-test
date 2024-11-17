import React from 'react';

import { Stack } from 'expo-router';
import { memo } from 'react';

const AuthLayout = () => {
  return (
    <Stack initialRouteName='auth-base'>
      <Stack.Screen name='auth-base' options={{ headerShown: false }} />
      <Stack.Screen name='login' />
      <Stack.Screen name='sign-up' />
    </Stack>
  );
};

export default memo(AuthLayout);
