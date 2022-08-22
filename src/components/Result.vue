<script setup lang="ts">
import SimpleImage from '@/components/SimpleImage.vue'
import UnstyledList from '@/components/UnstyledList.vue';
import type { entry } from "@/types/data";
import { toRefs } from "vue";
/* @ts-ignore */
import translations from "@/assets/data/translations";
import { imageUrl } from '@/lib/utils'
const props = defineProps<{
    item: entry;
    hr: boolean;
    context: string;
    showImg: boolean;
}>();

const { item } = toRefs(props);
const image = imageUrl(item.value)
</script>

<template>
    <div class="content">
        <div class="columns">
            <div class="column is-flex is-4 p-0" v-if="showImg">
                <RouterLink class="has-text-info" :to="`/material/${item.id}?context=${context}`">
                    <SimpleImage :img="image" :type="item.metadata.type" />
                </RouterLink>
            </div>
            <div class="column is-flex is-flex-direction-column is-justify-content-space-between"
                :class="{ 'is-8': showImg }">
                <div>
                    <RouterLink class="has-text-info" :to="`/material/${item.id}?context=${context}`">
                        <h5 class="title is-5 has-text-primary">{{ item.biblio.title }}</h5>
                    </RouterLink>
                    <UnstyledList>
                        <li>Vitrine: To-Do</li>
                        <li>
                            Werkkontext:
                            <span class="is-italic">{{ item.biblio.context }}</span>
                        </li>
                    </UnstyledList>
                </div>
                <div class="tags is-flex">
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
