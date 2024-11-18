import { Text } from '@/components';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ focused }) => <Text>{focused ? '🏠' : '🏘️'}</Text>,
          title: 'Задачи',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ focused }) => <Text>{focused ? '👤' : '👨🏼‍🦱'}</Text>,

          title: 'Профиль',
        }}
      />
    </Tabs>
  );
}
