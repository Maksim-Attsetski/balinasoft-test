import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useThemeColor } from '@/hooks';

export default function TabLayout() {
  const tabBarActiveTintColor = useThemeColor('tint');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
        animation: 'shift',
      }}
    >
      <Tabs.Screen name='index' options={{ title: 'Ваши Задачи' }} />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
        }}
      />
    </Tabs>
  );
}
