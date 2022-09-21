import { ReactNode } from 'react';
import createStore from 'zustand/context';
import { useAuth } from '../hooks/useAuth';

const { Provider } = createStore();

const store = () => useAuth;

interface IProps {
  children: ReactNode;
}

export function AuthContext(props: IProps) {
  return (
    <Provider createStore={store}>
      { props.children }
    </Provider>
  )
}