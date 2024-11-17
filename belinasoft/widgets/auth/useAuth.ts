import { supabase } from '@/global';
import { useAuthStore } from './store';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const useAuth = () => {
  const { user, setUser } = useAuthStore();

  const onLogin = async (credentials: SignInWithPasswordCredentials) => {
    try {
      const user = await supabase.auth.signInWithPassword(credentials);
      setUser(user.data.user);
    } catch (error: any) {
      Alert.alert(error?.message ?? 'Ошибка' + JSON.stringify(error));
      console.error(error);
    }
  };

  const onSignup = async (credentials: SignUpWithPasswordCredentials) => {
    try {
      const user = await supabase.auth.signUp(credentials);
      setUser(user.data.user);
    } catch (error: any) {
      Alert.alert(error?.message ?? 'Ошибка' + JSON.stringify(error));
      console.error(error);
    }
  };

  const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.replace('/(auth)/auth-base');
    } catch (error: any) {
      Alert.alert(error?.message ?? 'Ошибка' + JSON.stringify(error));
      console.error(error);
    }
  };

  return { user, setUser, onLogout, onLogin, onSignup };
};
