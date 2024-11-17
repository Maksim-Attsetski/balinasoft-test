import { supabase } from '@/global';
import { useAuth } from '@/widgets';
import { Redirect, router } from 'expo-router';
import React, { FC, memo, PropsWithChildren, useEffect } from 'react';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUser, user } = useAuth();

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return sub.data.subscription.unsubscribe;
  }, []);

  useEffect(() => {
    router.replace(user?.id ? '/' : '/(auth)/auth-base');
  }, [user]);

  return <>{children}</>;
};

export default memo(AuthProvider);
