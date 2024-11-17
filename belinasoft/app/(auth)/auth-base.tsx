import { Layout } from '@/components';
import { Link } from 'expo-router';
import React from 'react';

import { memo } from 'react';
import { Text, View } from 'react-native';

const AuthBase = () => {
  return (
    <Layout>
      <Text>Base auth sceen</Text>
      <Link href={'/(auth)/sign-up'}>Sign up</Link>
      <Link href={'/(auth)/login'}>Log in</Link>
    </Layout>
  );
};

export default memo(AuthBase);
