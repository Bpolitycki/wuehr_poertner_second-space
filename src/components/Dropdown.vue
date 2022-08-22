<script setup lang="ts">
import IconArrowUp from "./icons/IconArrowUp.vue";
import IconArrowDown from "./icons/IconArrowDown.vue";
import { ref } from "vue";

defineProps<{
  title: string;
  id: string;
}>();

const showContent = ref(false);
</script>

<template>
  <div class="dropdown" :class="{ 'is-active': showContent }">
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        :aria-controls="'dropdown-' + id"
        @click="() => (showContent = !showContent)"
      >
        <span>{{ title }}</span>
        <span class="icon is-small">
          <IconArrowDown v-if="!showContent"></IconArrowDown>
          <IconArrowUp v-else></IconArrowUp>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" :id="'dropdown-' + id" role="menu">
      <div class="dropdown-content">
        <slot />
      </div>
    </div>
  </div>
</template>
