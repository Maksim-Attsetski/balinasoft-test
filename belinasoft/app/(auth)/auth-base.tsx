import { memo } from 'react';

import { Link } from 'expo-router';
import React from 'react';

import { Button, Gap, Layout, Text } from '@/components';
import { StyleSheet, View } from 'react-native';

const AuthBase = () => {
  return (
    <>
      <Gap y={50} />
      <Text title>Добро пожаловать!</Text>
      <Gap y={24} />
      <View style={styles.btnContainer}>
        <Button full type='primary' to={'/(auth)/sign-up'}>
          Регистрация
        </Button>
        <Button full type='secondary' to={'/(auth)/login'}>
          Войти
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 'auto',
    marginBottom: 12,
  },
});

export default memo(AuthBase);
