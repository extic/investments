import { Security } from "@/types/types";
import { defineStore } from "pinia";

export type SecurityListItem = Security

export const useSecurityListStore = defineStore("securityList", {
  state: () => ({
    _list: [] as SecurityListItem[],
    _selected: undefined as SecurityListItem | undefined,
  }),

  getters: {
    list: (state): SecurityListItem[] => state._list,
    selected: (state): SecurityListItem | undefined => state._selected,
  },

  actions: {
    setList(list: SecurityListItem[]): void {
      this._list = list;
    },

    setSelected(selected: SecurityListItem | undefined): void {
      this._selected = selected;
    },
  },
});
