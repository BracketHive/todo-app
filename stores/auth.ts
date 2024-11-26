import { defineStore, type _GettersTree } from 'pinia';

export interface Login {
  email: string
  password: string
}

export interface AuthState {
  isAuthenticated: boolean
}

export type AuthActions = {
  login: (credentials: Login) => void
  logout: () => void
}


export const useAuthStore = defineStore<string, AuthState, {}, AuthActions>('auth', {
  state: () => ({
    isAuthenticated: false
  }),

  getters: {},

  actions: {
    login(credentials: Login) {
      if (credentials.email === 'george@titlos.com' && credentials.password === 'titlos') {
        this.isAuthenticated = true;
      } else {
        alert('Invalid credentials');
      }
    },

    logout() {
      this.isAuthenticated = false;
    },
  },

  persist: {
    pick: ['isAuthenticated'],
  },
});

