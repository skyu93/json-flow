import { defineStore } from "pinia";
interface StoreState {
  isDarkMode: boolean;
  showLeftPanel: boolean;
  currentCaretPosition: {
    row: number;
    col: number;
  };
}

export const useStore = defineStore("JsonFlowStore", {
  state: (): StoreState => ({
    isDarkMode: false,
    showLeftPanel: true,
    currentCaretPosition: {
      row: 0,
      col: 0,
    },
  }),
  actions: {},
});
