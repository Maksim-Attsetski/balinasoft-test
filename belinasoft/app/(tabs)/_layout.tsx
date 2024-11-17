import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useThemeColor } from '@/hooks';

export default function TabLayout() {
  const tabBarActiveTintColor = useThemeColor('tint');

  return (
    <Tabs>
      <Tabs.Screen name='index' options={{ title: 'Ваши задачи' }} />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
        }}
      />
    </Tabs>
  );
}
