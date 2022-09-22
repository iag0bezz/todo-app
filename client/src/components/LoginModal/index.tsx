import styles from './styles.module.css';

import Modal from 'react-modal';
import { useState } from 'react';
import { useStore } from 'zustand';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

interface IProps {
  toggle: (value: boolean) => void;
  open: boolean;
}

const style = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'var(--gray-600)',
    border: 'none',
    borderRadius: '8px',
    paddingBottom: '1rem'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)'
  }
}

export const LoginModal = ({ open, toggle }: IProps) => {
  const state = useStore(
    useAuth
  );

  const [toggled, setToggled] = useState(false);

  const handleRegister = async (event: any) => {
    const { username, password } = retrieveValues(event);

    const response = await api.post('/users', {
      username,
      password
    });

    console.log('REGISTER RESPONSE ', response.data);
  }

  const handleLogin = async (event: any) => {
    const { username, password } = retrieveValues(event);
 
    const response = await state.signIn(username, password);

    console.log(response);

    if (response.message !== 'authentication.success') {
      alert(response);
      return;
    }

    alert('Autenticado com sucesso');

    toggle(false);
  }

  const retrieveValues = (event: any): { username: string, password: string } => {
    event.preventDefault();
    const username = event?.target[0].value;
    const password = event?.target[1].value;

    return {
      username,
      password
    }
  }

  return (
    <div>
      <Modal
          isOpen={open}
          onRequestClose={() => toggle(false)}
          style={style}
        >
          <form onSubmit={toggled ? handleRegister : handleLogin} className={styles.content}>
            <input
              placeholder='Insira o nome de usuário'
              type='text'
              name='username'
              autoComplete='off'
              required
            />

            <input
              placeholder='Insira sua senha de acesso'
              type='password'
              name='password'
              autoComplete='off'
              required
            />

            <button>
              { toggled ? 'REGISTRAR' : 'ENTRAR' }
            </button>

            <p>
              { toggled ? 'Já possui uma conta?': 'Não possui uma conta?' }
              <span onClick={() => setToggled(!toggled)}>
                { toggled ? 'Entre agora': 'Registre-se agora' }
              </span>
            </p>
          </form>
        </Modal>
    </div>
  )
}