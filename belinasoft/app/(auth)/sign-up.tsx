import React, { memo } from 'react';

import { Link } from 'expo-router';
import { Text } from 'react-native';

import { Layout } from '@/components';

const SignUp = () => {
  return (
    <>
      <Text>Sign up auth sceen</Text>
      <Link href={'../'}>Back</Link>
    </>
  );
};

export default memo(SignUp);
