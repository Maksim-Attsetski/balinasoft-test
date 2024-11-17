import { supabase } from '@/global';
import { useAuth } from '@/widgets';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Redirect, router } from 'expo-router';
import React, { FC, memo, PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUser, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const access_token = await useAsyncStorage('access_token').getItem();

        if (access_token) {
          const res = await supabase.auth.getUser(access_token);
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    router.replace(user?.id ? '/' : '/(auth)/auth-base');
  }, [user]);

  return (
    <>
      {loading && (
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255,0.95)',
            zIndex: 9999,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator
            style={{ transform: [{ scale: 4 }] }}
            size={'large'}
          />
        </View>
      )}
      {children}
    </>
  );
};

export default memo(AuthProvider);
