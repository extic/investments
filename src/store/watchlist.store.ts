import { writeFile } from "@/services/file.service";
import { Security } from "@/types/types";
import { defineStore } from "pinia";

export type WatchlistItem = Security & {
  id: string;
};

export const useWatchlistStore = defineStore("Watchlist", {
  state: () => ({
    _items: [] as WatchlistItem[],
    _selected: undefined as WatchlistItem | undefined,
  }),

  getters: {
    items: (state): WatchlistItem[] => state._items,
    selected: (state): WatchlistItem | undefined => state._selected,
  },

  actions: {
    setItems(items: WatchlistItem[]): void {
      this._items = items;
    },

    setSelected(selected: WatchlistItem | undefined): void {
      this._selected = selected;
    },

    add(item: WatchlistItem): void {
      if (!this._items.find((it) => it.number === item.number)) {
        this._items.push(item);
        writeFile(`watchlist`, this._items);
      }
    }
  },
});
