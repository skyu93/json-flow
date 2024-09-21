// eslint.config.js
import vueEslintParser from "vue-eslint-parser";
import typescriptEslintParser from "@typescript-eslint/parser";
import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.vue"], // 적용할 파일 패턴
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      vue: eslintPluginVue,
      "@typescript-eslint": eslintPluginTypescript,
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
  // Prettier 설정을 따로 추가
  prettier,
];
