import { defineStore } from "pinia";

export const useSetttingsStore = defineStore("settings", {
  state: () => ({
    _databaseFolder: 'C:/Users/User/.investments',
  }),

  getters: {
    databaseFolder: (state): string => state._databaseFolder,
  },

  actions: {},
});
