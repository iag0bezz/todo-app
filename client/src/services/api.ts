import axios from "axios";
import { useStore } from "zustand";
import { useAuth } from "../hooks/useAuth";

const api = axios.create({
  headers: {
    'Authorization': localStorage.getItem('@access_token') === null
      ? `Bearer ${localStorage.getItem('@access_token')!}` : ''
  },
  baseURL: 'http://localhost:3333/api/v1'
});

const refresh = () => {
  const state = useStore(
    useAuth
  )

  return new Promise(
    (resolve, reject) => {
      const refresh_token = state.refresh_token

      const headers = {
        'Authorization': `Bearer ${refresh_token}`
      }

      api.post('/session/refresh', {
        headers,
      }).then(
        (response: any) => {
          state.updateTokens(
            response.access_token as string // Access token
          );

          return resolve(response);
        },
        (error) => {
          return reject(error);
        }
      )
    }
  )
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const access_token = localStorage.getItem('@access_token');

    if (error.response.status === 401 || access_token === null) {
      const response = await refresh();

      return response;
    }

    return Promise.reject(error);
  }
)

export default api;