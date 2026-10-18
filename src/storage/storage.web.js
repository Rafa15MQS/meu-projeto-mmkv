
const PREFIX = 'meu-projeto-storage:';

export const storage = {
  set(key, value) {
    window.localStorage.setItem(PREFIX + key, value);
  },

  getString(key) {
    return window.localStorage.getItem(PREFIX + key) ?? undefined;
  },

  delete(key) {
    window.localStorage.removeItem(PREFIX + key);
  },
};
