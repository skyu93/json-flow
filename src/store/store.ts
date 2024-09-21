import { defineStore } from "pinia";
interface StoreState {
  isDarkMode: boolean;
  showLeftPanel: boolean;
  currentCaretPosition: {
    row: number;
    col: number;
  };
  json: string;
}

export const useStore = defineStore("JsonFlowStore", {
  state: (): StoreState => ({
    isDarkMode: false,
    showLeftPanel: true,
    currentCaretPosition: {
      row: 0,
      col: 0,
    },
    json: "",
  }),
  actions: {
    getJsonParse() {
      if (!this.json) return {};
      try {
        return JSON.parse(this.json);
      } catch (e) {
        console.error(e);
        return {};
      }
    },
  },
});
