import { supabase } from '@/global';
import { useAuthStore } from './store';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { router } from 'expo-router';

export const useAuth = () => {
  const { user, setUser } = useAuthStore();

  const onLogin = async (credentials: SignInWithPasswordCredentials) => {
    const user = await supabase.auth.signInWithPassword(credentials);
    setUser(user.data.user);
  };

  const onSignup = async (credentials: SignUpWithPasswordCredentials) => {
    const user = await supabase.auth.signUp(credentials);
    setUser(user.data.user);
  };

  const onLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.replace('/(auth)/auth-base');
  };

  return { user, setUser, onLogout, onLogin, onSignup };
};
