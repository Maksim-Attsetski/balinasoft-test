import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { Layout } from '@/components';

export default function TabTwoScreen() {
  return (
    <Layout>
      <Text>Home</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
