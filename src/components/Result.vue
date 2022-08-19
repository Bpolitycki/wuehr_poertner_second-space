<script setup lang="ts">
import SimpleImage from '@/components/SimpleImage.vue'
import type { entry } from "@/types/data";
import { toRefs } from "vue";
/* @ts-ignore */
import translations from "@/assets/data/translations";
import { imageUrl } from '@/lib/utils'
const props = defineProps<{
    item: entry;
    hr: boolean;
}>();

const { item } = toRefs(props);
const image = imageUrl(item.value)
</script>

<template>
    <div class="content">
        <div class="columns">
            <div class="column is-flex is-4 p-0">
                <RouterLink class="has-text-info" :to="`/material/${item.id}`">
                    <SimpleImage :img="image" :type="item.metadata.type" />
                </RouterLink>
            </div>
            <div class="column is-flex is-flex-direction-column is-justify-content-space-between is-8">
                <div>
                    <RouterLink class="has-text-info" :to="`/material/${item.id}`">
                        <h5 class="title is-5 has-text-primary">{{ item.biblio.title }}</h5>
                    </RouterLink>
                    <ul>
                        <li>Vitrine: To-Do</li>
                        <li>
                            Werkkontext:
                            <span class="is-italic">{{ item.biblio.context }}</span>
                        </li>
                    </ul>
                </div>
                <div class="tags">
                    <span class="tag is-info is-light">{{
                            translations.translations.biblio[item.biblio.type]
                    }}</span>
                    <span class="tag is-success is-light">{{
                            translations.translations.media[item.media]
                    }}</span>
                    <span class="tag is-warning is-light">{{
                            translations.translations.metadata[item.metadata.type]
                    }}</span>
                </div>
            </div>
        </div>
        <hr v-if="hr" />
    </div>
</template>

<style scoped lang="scss">
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
