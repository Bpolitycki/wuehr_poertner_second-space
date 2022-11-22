import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

type context = 'material' | 'search';

export const useScrollPosition = defineStore('scroll', () => {
  const topPos: Ref<number | undefined> = ref(undefined);
  const leaveContext: Ref<context | undefined> = ref(undefined);

  function resetScroll() {
    topPos.value = undefined;
    leaveContext.value = undefined;
  }

  return {
    topPos,
    leaveContext,
    resetScroll,
  };
});
