import React, { FC, memo, PropsWithChildren } from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});

export default memo(Layout);
