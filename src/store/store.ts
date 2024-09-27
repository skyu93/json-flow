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
    json:
      "{\n" +
      '  "id": 101,\n' +
      '  "name": "Laptop",\n' +
      '  "category": "Electronics",\n' +
      '  "price": 1299.99,\n' +
      '  "features": {\n' +
      '    "processor": "Intel Core i7",\n' +
      '    "ram": "16GB",\n' +
      '    "storageOptions": [\n' +
      '      "256GB SSD",\n' +
      '      "512GB SSD",\n' +
      '      "1TB SSD"\n' +
      "    ],\n" +
      '    "availableColors": [\n' +
      '      "Silver",\n' +
      '      "Space Gray",\n' +
      '      "Black"\n' +
      "    ],\n" +
      '    "screenSize": "15.6 inches",\n' +
      '    "ports": [\n' +
      "      {\n" +
      '        "type": "USB-C",\n' +
      '        "quantity": 2\n' +
      "      },\n" +
      "      {\n" +
      '        "type": "USB-A",\n' +
      '        "quantity": 1\n' +
      "      },\n" +
      "      {\n" +
      '        "type": "HDMI",\n' +
      '        "quantity": 1\n' +
      "      }\n" +
      "    ]\n" +
      "  },\n" +
      '  "availability": true\n' +
      "}",
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
