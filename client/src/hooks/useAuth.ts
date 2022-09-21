import create from 'zustand';
import { devtools } from 'zustand/middleware';

export type AuthResponse = {
  message?: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    username: string;
  }
}

interface IAuthState {
  authenticated: boolean;
  access_token: string | undefined;
  refresh_token: string | undefined;
  user: {
    username: string;
  } | undefined;
  signIn(
    access_token: string, 
    refresh_token: string, 
    username: string
  ): void;
  updateTokens(
    access_token?: string,
    refresh_token?: string,
  ): void;
  logOut(): void;
  hydrate(): void;
}

export const useAuth = create(
  devtools<IAuthState>(
    (set, get) => ({
      authenticated: false,
      access_token: undefined,
      refresh_token: undefined,
      user: undefined,
      updateTokens: (refresh_token, access_token) => {
        set(state => ({
          access_token: access_token || state.access_token,
          refresh_token: refresh_token || state.refresh_token 
        }))
      },
      signIn: (access_token, refresh_token, username) => {
        localStorage.setItem('@access_token', access_token);
        localStorage.setItem('@refresh_token', refresh_token);

        set({
          authenticated: true,
          access_token,
          refresh_token,
          user: {
            username,
          }
        })
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
      },
      hydrate: () => {
        if (get().access_token === undefined) {
          get().logOut();
        }
      }
    })
  )
)