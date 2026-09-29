import { demoProfiles } from '../data/users';
import { simulateRequest } from './api';

const STORAGE_KEY = 'streamflix-demo-profiles';

export const userService = {
  async getProfiles() {
    return simulateRequest(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoProfiles));
      return demoProfiles;
    });
  },

  async updateProfile(profile) {
    return simulateRequest(() => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const nextProfiles = saved.some((item) => item.id === profile.id)
        ? saved.map((item) => (item.id === profile.id ? profile : item))
        : [...saved, profile];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfiles));
      return nextProfiles;
    });
  },
};
