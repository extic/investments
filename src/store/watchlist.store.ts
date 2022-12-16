import { writeFile } from "@/services/file.service";
import { Security } from "@/types/types";
import { defineStore } from "pinia";

export type WatchlistItem = Security & {
  id: string;
};

export const useWatchlistStore = defineStore("Watchlist", {
  state: () => ({
    _items: [] as WatchlistItem[],
  }),

  getters: {
    items: (state): WatchlistItem[] => state._items,
  },

  actions: {
    setItems(items: WatchlistItem[]): void {
      this._items = items;
    },

    add(item: WatchlistItem): void {
      if (!this._items.find((it) => it.number === item.number)) {
        this._items.push(item);
        writeFile(`watchlist`, this._items);
      }
    }
  },
});
