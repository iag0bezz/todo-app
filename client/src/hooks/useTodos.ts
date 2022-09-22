import create from 'zustand';
import { devtools } from "zustand/middleware";
import api from '../services/api';
import { Task } from "../typing";
import { useAuth } from './useAuth';

interface IUpdate {
  todos?: Task[];
}

interface ITodosState {
  todos: Task[];
  add(task: Task): Promise<void>;
  remove(task: Task): Promise<void>;
  toggle(task: Task): Promise<void>;
  fetch(): Promise<void>;
}

export const useTodos = create(
  devtools<ITodosState>(
    (set, get) => ({
      todos: [],
      add: async (task: Task) => {
        set(state => ({
          todos: [ ...state.todos, task ]
        }));

        const {
          authenticated,
          user,
          access_token
        } = useAuth.getState()

        if (authenticated && user) {
          try {
            const response = await api.post('/todos', {
              content: task.content,
              completed: task.completed,
            }, {
              headers: {
                'Authorization': `Bearer ${access_token}` 
              }
            });

            if (response.status === 404) {
              get().remove(task);

              return;
            }
          } catch {
            get().remove(task);
          }
        } else {
          localStorage.setItem(
            '@tasks',
            JSON.stringify(
              get().todos,
            )
          );
        }
      },
      remove: async (task: Task) => {
        set(state => ({
          todos: state.todos.filter(
            todo => todo.id !== task.id
          ),
        }));

        const {
          authenticated,
          user,
          access_token
        } = useAuth.getState()

        if (authenticated && user) {
          await api.delete('/todos', {
            headers: {
              'Authorization': `Bearer ${access_token}`
            },
            data: {
              id: task.id,
            }
          })
        } else {
          localStorage.setItem(
            '@tasks',
            JSON.stringify(
              get().todos,
            )
          );
        }
      },
      toggle: async (task: Task) => {
        set(state => ({
          todos: state.todos.map(
            todo => {
              if (todo.id === task.id) {
                todo.completed = !task.completed
              }

              return todo
            }
          )
        }))

        const {
          authenticated,
          user,
          access_token
        } = useAuth.getState()

        if (authenticated && user) {
          await api.put('/todos', {
            id: task.id,
            completed: task.completed,
          }, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          });
        } else {
          localStorage.setItem(
            '@tasks',
            JSON.stringify(
              get().todos,
            )
          );
        }
      },
      fetch: async () => {
        const { authenticated, access_token } = useAuth.getState();

        if (authenticated && access_token) {
          try {
            const response = await api.get('/todos', {
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            })

            set({
              todos: response.data
            })

            return;
          } catch {}
        }

        set({
          todos: 
            localStorage.getItem('@tasks') === null ?
            [] : JSON.parse(
              localStorage.getItem('@tasks')!
            )
        })
      }
    })
  )
)