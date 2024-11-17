import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, Gap, Layout, Text } from '@/components';
import { useAuth } from '@/widgets';
import { useTheme } from '@/hooks';

export default function ProfileScreen() {
  const { user, onLogout } = useAuth();
  const { isDark, onChangeTheme } = useTheme();

  return (
    <Layout>
      <Text style={styles.themeTitle}>Тема</Text>
      <Gap y={20} />

      <View style={styles.rowFlex}>
        <Button
          full
          type={isDark ? 'common' : 'primary'}
          btnProps={{
            onPress: () => onChangeTheme('light'),
          }}
        >
          Светлая
        </Button>
        <Button
          full
          type={isDark ? 'primary' : 'common'}
          btnProps={{
            onPress: () => onChangeTheme('dark'),
          }}
        >
          Тёмная
        </Button>
      </View>

      <Gap y={20} />
      <View style={styles.divider} />
      <Gap y={20} />

      <Text>Имя: {user?.user_metadata?.name}</Text>
      <Text>E-mail: {user?.email}</Text>

      <Gap y={20} />

      <Button
        type='secondary'
        btnProps={{
          style: styles.logoutBtn,
          onPress: onLogout,
        }}
      >
        Выйти
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  themeTitle: { textAlign: 'center' },
  divider: {
    width: '70%',
    height: 1,
    backgroundColor: 'rgba(35,35,35,0.5)',
    alignSelf: 'center',
  },
  logoutBtn: {
    marginTop: 'auto',
    marginBlock: 20,
  },
  rowFlex: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'space-around',
  },
});
