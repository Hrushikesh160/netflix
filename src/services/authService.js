import { demoUsers } from '../data/users';
import { simulateRequest } from './api';

const STORAGE_KEY = 'streamflix-demo-auth';

export const authService = {
  async login({ email, password }) {
    return simulateRequest(() => {
      const user = demoUsers.find(
        (demoUser) => demoUser.email.toLowerCase() === email.toLowerCase() && demoUser.password === password,
      );

      if (!user) {
        throw new Error('Invalid email or password.');
      }

      const safeUser = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
      return safeUser;
    });
  },

  async signup({ name, email, password }) {
    return simulateRequest(() => {
      const exists = demoUsers.some((user) => user.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = { id: `${Date.now()}`, name, email, password };
      demoUsers.push(newUser);
      const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
      return safeUser;
    });
  },

  async getCurrentUser() {
    return simulateRequest(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    });
  },

  async logout() {
    return simulateRequest(() => {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    });
  },
};
