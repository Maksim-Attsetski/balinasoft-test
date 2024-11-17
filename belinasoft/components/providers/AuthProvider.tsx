import { Redirect } from 'expo-router';
import React, { FC, memo, PropsWithChildren } from 'react';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  if (true) {
    <Redirect href={'/(tabs)'} />;
  }

  return <>{children}</>;
};

export default memo(AuthProvider);
