<script setup lang="ts">
import IconFilter from "./icons/IconFilter.vue";
import FilterSelection from "./FilterSelection.vue";
import { ref } from "vue";

const isOpen = ref(false);

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <button id="openModal" class="button is-primary px-2" @click="toggleModal">
    <IconFilter /> Filter
  </button>
  <Transition>
    <div class="modal is-active" v-show="isOpen">
      <div class="modal-background" @click="() => (isOpen = false)"></div>
      <div class="modal-content">
        <FilterSelection @close="() => (isOpen = false)" />
      </div>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal-content {
  height: 100vh;
  width: 90vw;
}
</style>
