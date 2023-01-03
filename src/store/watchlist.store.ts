import { writeFile } from "@/services/file.service";
import { Security } from "@/types/types";
import { defineStore } from "pinia";

export const useWatchlistStore = defineStore("Watchlist", {
  state: () => ({
    _items: [] as string[],
    _selected: undefined as string | undefined,
  }),

  getters: {
    items: (state): string[] => state._items,
    selected: (state): string | undefined => state._selected,
  },

  actions: {
    setItems(items: string[]): void {
      this._items = items;
    },

    setSelected(selected: string | undefined): void {
      this._selected = selected;
    },

    add(item: string): void {
      if (!this._items.includes(item)) {
        this._items.push(item);
        writeFile(`watchlist`, this._items);
      }
    }
  },
});
