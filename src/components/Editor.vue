<script setup lang="ts">
import { computed, CSSProperties, onMounted, onUnmounted, PropType, ref, shallowRef, watch } from "vue";
import { editor } from "monaco-editor";
import { debounce } from "../utils.ts";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const props = defineProps({
  modelValue: { type: String, default: "" },
  theme: { type: String as PropType<"dark" | "light">, default: "light" },
  language: { type: String, default: "json" },
});
const emits = defineEmits(["update:modelValue"]);

const elementRef = ref<HTMLElement>();
const jsonEditor = shallowRef<editor.IStandaloneCodeEditor>();
const editorText = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emits("update:modelValue", value);
  },
});
const editorOptions = computed(() => ({
  language: props.language,
  theme: `vs-${props.theme}`,
  fontSize: 20,
  minimap: {
    enabled: false, // 미니맵(코드 요약 미리보기) 활성화 여부
  },
  automaticLayout: true, // 컨테이너의 크기에 맞춰 자동으로 레이아웃 조정
}));

watch(
  () => editorOptions.value,
  options => {
    jsonEditor.value?.updateOptions({ ...options });
  },
);

onMounted(async () => {
  if (!elementRef.value) return;

  jsonEditor.value = editor.create(elementRef.value, {
    value: props.modelValue,
    ...editorOptions.value,
  });

  jsonEditor.value.onDidChangeModelContent(() => {
    editorText.value = jsonEditor.value?.getValue() || "";
  });

  jsonEditor.value.onDidPaste(() => {
    jsonEditor.value?.getAction("editor.action.formatDocument")?.run();
  });
});

onUnmounted(() => {
  jsonEditor.value?.dispose();
});
</script>

<template>
  <div ref="elementRef" style="width: 100%; height: 100%" />
</template>

<style scoped></style>
