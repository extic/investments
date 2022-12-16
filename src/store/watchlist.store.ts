import { writeFile } from "@/services/file.service";
import { defineStore } from "pinia";

export type WatchlistItem = {
  id: string;
  securityNumber: string;
  securityName: string;

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
      if (!this._items.find((it) => it.securityNumber === item.securityNumber)) {
        this._items.push(item);
        writeFile(`watchlist`, this._items);
      }
    }
  },
});
