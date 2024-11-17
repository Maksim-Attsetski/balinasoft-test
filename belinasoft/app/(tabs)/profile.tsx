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
      <Text style={{ textAlign: 'center' }}>Тема</Text>
      <Gap y={20} />

      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        <Button
          type={isDark ? 'common' : 'primary'}
          btnProps={{
            onPress: () => onChangeTheme('light'),
          }}
        >
          Светлая
        </Button>
        <Button
          type={isDark ? 'primary' : 'common'}
          btnProps={{
            onPress: () => onChangeTheme('dark'),
          }}
        >
          Тёмная
        </Button>
      </View>

      <Gap y={20} />

      <Text>Имя: {user?.user_metadata?.name}</Text>
      <Text>E-mail: {user?.email}</Text>

      <Gap y={20} />

      <Button
        type='secondary'
        btnProps={{
          style: { marginTop: 'auto', marginBlock: 20 },
          onPress: onLogout,
        }}
        full={false}
      >
        Выйти
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({});
