<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps<{
    alt: string,
    img: string
}>()
const { img } = toRefs(props)
const imageUrl = new URL(`../assets/${img?.value}`, import.meta.url).href
</script>

<template>
    <section class="top-banner-section">
        <!-- The CSS grid area that displays the image (layer 1) -->
        <div class="banner-image-div">
            <img :src="imageUrl" :alt="alt" class="banner-image" />
        </div>
        <!-- The CSS grid area that displays the semi-transparent gradient overlay (layer 2) -->
        <div class="banner-overlay-div" />
        <!-- The CSS grid area that displays the content (layer 3) -->
        <div class="banner-text-div p-4">
            <slot />
        </div>
    </section>
</template>

<style lang="scss">
.top-banner-section {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-content: center;
    justify-content: center;
    max-height: calc(100vh - $navbar-height);
}

@media (min-width: 1024px) {
    .top-banner-section {
        grid-template-rows: minmax(380px, 100vh);
    }
}

.top-banner-section .banner-image-div,
.top-banner-section .banner-overlay-div,
.top-banner-section .banner-text-div {
    grid-area: 1 / 1 / 2 / 2;
}

.banner-image {
    display: grid;
    min-width: 350px;
    width: 100%;
    height: 100%;
    object-fit: cover;

    filter: blur(2.5px);
    -webkit-filter: blur(2.5px);
}

.banner-overlay-div {
    display: grid;
    max-width: 100%;
    background: rgba(0, 0, 0, 0.1);
}

.banner-text-div {
    display: grid;
    align-items: center;
}

.banner-body-text {
    font-size: calc(10pt + 0.15vw);
    margin-top: 0.5em;
}

.banner-heading {
    margin: auto;
}
</style>
