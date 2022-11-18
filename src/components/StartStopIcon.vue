<script setup lang="ts">
import IconPlay from "./icons/IconPlay.vue";
import IconPause from "./icons/IconPause.vue";
import type { entry } from "@/types/data";
import { onMounted } from "vue";
import { useAudioStore } from "@/stores/audio";
import { storeToRefs } from "pinia";

const props = defineProps<{
  entry: entry;
}>();

const store = useAudioStore();
const { isPlaying, item } = storeToRefs(store);

const startStop = (): void => {
  if (!item.value || item.value.id !== props.entry.id) {
    store.setItem(props.entry);
  }
  store.startStop(!isPlaying.value);
};

onMounted(() => {
  if (item.value && item.value.id !== props.entry.id) {
    store.resetAudio();
  }
});
</script>

<template>
  <div
    class="has-background-light is-flex is-justify-content-center is-align-items-center pt-0"
  >
    <button @click="startStop" class="has-text-black">
      <IconPause v-if="isPlaying" />
      <IconPlay v-else />
    </button>
  </div>
</template>

<style scoped lang="scss">
div {
  height: 250px;
  width: auto;

  button {
    border: none;
    background: none;
    cursor: pointer;

    svg {
      height: 8rem;
      width: 8rem;
    }
  }
}
</style>
