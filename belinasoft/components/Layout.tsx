import React, { FC, memo, PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default memo(Layout);
