<script setup lang="ts">
import { RouterLink } from 'vue-router';
import HeroBannerVue from '@/components/HeroBanner.vue';
import IconExpandVue from '@/components/icons/IconExpand.vue';
import IconSearchVue from '@/components/icons/IconSearch.vue';
import IconExpand from '../components/icons/IconExpand.vue';
import IconSearch from '../components/icons/IconSearch.vue';
</script>

<template>
    <HeroBannerVue img="hero-image.jpg" alt="Soundseeing München Partitur, Seite 2">
        <div class="container wrapper is-align-self-center is-flex is-flex-direction-column is-justify-content-center">
            <h1 class="title is-1 is-family-monospace">[pœrtnɐ]\\[vyːɐ̯]</h1>
            <h2 class="subtitle is-4 has-text-grey-dark">
                Spuren des O-Ton-Hörspiels zwischen Wuppertal und München
            </h2>
            <div class="buttons">
                <RouterLink to="/material" class="button is-primary is-medium pl-2">
                    <IconExpand /> Material entdecken
                </RouterLink>
                <RouterLink to="/search" class="button is-warning is-medium pl-2">
                    <IconSearch /> Dokument suchen
                </RouterLink>
            </div>
        </div>
    </HeroBannerVue>
</template>
