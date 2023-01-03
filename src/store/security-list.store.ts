import { Security } from "@/types/types";
import { defineStore } from "pinia";

export const useSecurityListStore = defineStore("securityList", {
  state: () => ({
    _list: [] as Security[],
    _indices: [] as string[],
    _selected: undefined as Security | undefined,
    _refreshing: false,
    _filter: "",
    _selectedIndex: "ת\"א-35",
  }),

  getters: {
    list: (state): Security[] => state._list,
    indices: (state): string[] => state._indices,
    selected: (state): Security | undefined => state._selected,
    refreshing: (state): boolean => state._refreshing,
    filter: (state): string => state._filter,
    selectedIndex: (state): string => state._selectedIndex,
  },

  actions: {
    setList(list: Security[]): void {
      this._list = list;

      const indices = [...new Set(list.flatMap((it) => it.indices).filter((it) => it))].sort()
      indices.push("");
      this._indices = indices;
    },

    setSelected(selected: Security | undefined): void {
      this._selected = selected;
    },

    setRefreshing(refreshing: boolean): void {
      this._refreshing = refreshing;
    },

    setFilter(filter: string): void {
      this._filter = filter;
    },

    setSelectedIndex(selectedIndex: string): void {
      this._selectedIndex = selectedIndex;
    },
  },
});
