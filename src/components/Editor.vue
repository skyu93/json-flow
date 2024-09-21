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
  width: {
    type: [String, Number],
    default: "100%",
  },
  height: {
    type: [String, Number],
    default: "100%",
  },
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
const style = computed<CSSProperties>(() => {
  return {
    width: isNaN(Number(props.width)) ? props.width : `${props.width}px`,
    height: isNaN(Number(props.height)) ? props.height : `${props.height}px`,
  };
});
const editorOptions = computed(() => ({
  language: props.language,
  theme: `vs-${props.theme}`,
}));

const resize = debounce(() => {
  jsonEditor.value?.layout();
}, 200);

watch(
  () => [props.height, props.width],
  () => {
    resize();
  },
);

watch(
  () => editorOptions.value,
  options => {
    jsonEditor.value?.updateOptions({ ...options });
  },
);

onMounted(() => {
  if (!elementRef.value) return;

  jsonEditor.value = editor.create(elementRef.value, {
    value: props.modelValue,
    ...editorOptions.value,
  });

  jsonEditor.value.onDidChangeModelContent(() => {
    editorText.value = jsonEditor.value?.getValue() || "";
  });
});

onUnmounted(() => {
  jsonEditor.value?.dispose();
});
</script>

<template>
  <div ref="elementRef" :style="style" />
</template>

<style scoped></style>
