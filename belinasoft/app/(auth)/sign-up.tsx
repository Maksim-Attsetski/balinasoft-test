import React, { memo } from 'react';

import { Link } from 'expo-router';
import { Text } from 'react-native';

import { Layout } from '@/components';

const SignUp = () => {
  return (
    <Layout>
      <Text>Sign up auth sceen</Text>
      <Link href={'../'}>Back</Link>
    </Layout>
  );
};

export default memo(SignUp);
