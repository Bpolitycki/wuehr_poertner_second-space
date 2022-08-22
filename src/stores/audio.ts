import { defineStore } from 'pinia';
import type { entry, mediaType } from '@/types/data';
import { ref, type Ref, computed, type ComputedRef } from 'vue';

export const useAudioStore = defineStore('audio', () => {
  const item: Ref<entry | undefined> = ref(undefined);
  const isPlaying: Ref<boolean> = ref(false);
  const time: Ref<number> = ref(0);

  const audioUrl: ComputedRef<string | undefined> = computed(() => {
    if (item.value)
      return new URL(
        `../assets/data/audio/${item.value.metadata.selectedFile}`,
        import.meta.url
      ).href;
    return undefined;
  });

  function setItem(entry: entry) {
    item.value = entry;
  }

  function startStop(state: boolean) {
    isPlaying.value = state;
  }

  function updateTime(playTime: number) {
    time.value = playTime;
  }

  function resetAudio() {
    item.value = undefined;
    isPlaying.value = false;
    time.value = 0;
  }

  return {
    audioUrl,
    item,
    isPlaying,
    time,
    setItem,
    startStop,
    updateTime,
    resetAudio,
  };
});
