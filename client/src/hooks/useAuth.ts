import create from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../services/api';
import { useTodos } from './useTodos';

export type AuthResponse = {
  message?: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    username: string;
  }
}

interface IUpdate {
  authenticated?: boolean;
  access_token?: string;
  refresh_token?: string;
  user?: { id: string; username: string };
}

interface IAuthState {
  authenticated: boolean;
  access_token: string | undefined;
  refresh_token: string | undefined;

  user: {
    id: string;
    username: string;
  } | undefined;
  
  signIn(
    username: string,
    password: string,
  ): Promise<{ message: string, errors?: string[] }>;
  
  update(data: IUpdate): Promise<void>;

  logOut(): void;
}

export const useAuth = create(
  devtools<IAuthState>(
    (set) => ({
      authenticated: false,
      access_token: localStorage.getItem('@access_token') || undefined,
      refresh_token: localStorage.getItem('@refresh_token') || undefined,
      user: undefined,
      
      update: async ({ authenticated, access_token, refresh_token, user }): Promise<void> => {
        set(state => ({
          authenticated,
          access_token: access_token ?? state.access_token,
          refresh_token: refresh_token ?? state.refresh_token,
          user: user ?? state.user, 
        }))
      },
      
      signIn: async (username: string, password: string): Promise<{ message: string, errors?: string[] }> => {
        try {
          const response = await api.post('/sessions', {
            username,
            password,
          });
  
          const { data } = response;

          console.log(response);
  
          if (response.status === 200) {
            localStorage.setItem('@access_token', data.access_token);
            localStorage.setItem('@refresh_token', data.refresh_token);

            set({
              authenticated: true,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              user: {
                id: data.user.id,
                username: data.user.username,
              }
            })

            useTodos.getState().fetch();
  
            return {
              message: 'authentication.success'
            };
          }
  
          return {
            message: response.data.message,
            errors: response.data.errors || [],
          }
        } catch (error: any) {
          return {
            message: error.response.data.message,
            errors: error.response.data.errors || [],
          }
        }
      },
      logOut: () => {
        localStorage.removeItem('@access_token');
        localStorage.removeItem('@refresh_token');

        set({
          authenticated: false,
          user: undefined,
          access_token: undefined,
          refresh_token: undefined,
        });

        useTodos.getState().fetch();
      },
    })
  )
)