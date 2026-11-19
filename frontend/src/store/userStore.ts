import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UserProfile } from '@/types/user.types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserProfile, token: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        
        login: (userData, token) => {
          localStorage.setItem('accessToken', token);
          set({ user: userData, isAuthenticated: true });
        },
        
        logout: () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({ user: null, isAuthenticated: false });
        },
        
        updateProfile: (data) => 
          set((state) => ({
            user: state.user ? { ...state.user, ...data } : null
          })),
      }),
      { name: 'auth-storage' }
    )
  )
);