import React, { memo } from 'react';

import { Layout } from '@/components';
import { Link } from 'expo-router';
import { Text } from 'react-native';

const LogIn = () => {
  return (
    <Layout>
      <Text>Log in auth sceen</Text>
      <Link href={'../'}>Back</Link>
    </Layout>
  );
};

export default memo(LogIn);
