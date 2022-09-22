import { ReactNode, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import shallow from 'zustand/shallow';
import { useTodos } from '../hooks/useTodos';

interface IProps {
  children: ReactNode;
}

export function AuthContext(props: IProps) {
  const [authenticated, access_token, authUpdate, logOut] = useAuth((state) => [
    state.authenticated,
    state.access_token,
    state.update,
    state.logOut
  ], shallow);

  useEffect(() => {
    const initialize = async () => {
      if (!authenticated && access_token) {
        try {
          const response = await api.get('/sessions/me', {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          });

          console.log(response)

          if (response.status === 200) {
            authUpdate({
              authenticated: true,
              user: {
                id: response.data.id,
                username: response.data.username
              },
            });

            useTodos.setState({
              todos: response.data.todos,
            })
          } 
        } catch {
          logOut();
        }
      }

      useTodos.getState().fetch();
    }

    initialize();
  }, []);

  return ( 
    <>
      { props.children }
    </>
  )
}