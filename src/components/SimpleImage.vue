<script lang="ts" setup>
import type { mediaType } from '@/types/data'
import IconSound from '@/components/icons/IconSound.vue';

defineProps<{
    img: string | undefined;
    type: mediaType
}>();

</script>

<template>
    <figure class="image">
        <img v-if="img" class="preview-img p-1" :src="img" alt="" />
        <IconSound v-else-if="!img && type === 'audio'" />
    </figure>
</template>

<style scoped lang="scss">
figure.image svg {
    height: 20vh;
    color: black;
}

figure.image .preview-img,
figure.image {
    max-height: 20vh;
    width: auto;
    border: 0.75px solid hsl(0, 0%, 86%);
}

figure.image .preview-img:hover {
    border-color: $primary;
}

figure.image svg:hover {
    color: $primary;
    border-color: $primary;
}
</style>
