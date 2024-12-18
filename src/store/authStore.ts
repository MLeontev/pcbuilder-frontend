import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthResponse } from '../types/AuthResponse';
import { IUser } from '../types/IUser';

type AuthStoreState = {
  user: IUser | null;
  isAuth: boolean;
  accessToken: string | null;
};

type AuthStoreActions = {
  setAuthData: (authData: AuthResponse) => void;
  logout: () => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    user: null,
    isAuth: false,
    accessToken: null,

    setAuthData: (authData) => {
      const { id, userName, roles, accessToken } = authData;
      localStorage.setItem('token', authData.accessToken);
      set({
        user: { id, userName, roles },
        isAuth: true,
        accessToken,
      });
    },

    logout: () => {
      localStorage.removeItem('token');
      set({
        user: null,
        isAuth: false,
        accessToken: null,
      });
    },
  }))
);
