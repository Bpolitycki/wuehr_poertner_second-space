<script setup lang="ts">
import IconFilter from './icons/IconFilter.vue';
import { ref } from 'vue'

const isOpen = ref(false);

const toggleModal = () => {
    isOpen.value = !isOpen.value
}

</script>

<template>
    <button id="openModal" class="button is-light px-2" @click="toggleModal">
        <IconFilter /> Filter
    </button>
    <div :class="{ 'is-active': isOpen }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <!-- Any other Bulma elements you want -->
        </div>
        <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
    </div>
</template>
