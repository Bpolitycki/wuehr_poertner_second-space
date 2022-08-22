<script lang="ts" setup>
import type { entry } from '@/types/data';
import UnstyledList from '@/components/UnstyledList.vue'
/*@ts-ignore*/
import translations from "@/assets/data/translations";

const props = defineProps<{
    item: entry;
}>();

</script>


<template>
    <h4 class="title is-4">{{ item.biblio.title }}</h4>
    <h5 class="subtitle is-5" v-if="item.biblio.subtitle">{{ item.biblio.subtitle }}</h5>
    <h6 class="subtitle is-6">{{ translations.translations.biblio[item.biblio.type] }}</h6>
    <UnstyledList>
        <li>Vitrine: Ergänzen</li>
        <li>Werkkontext: <span class="is-italic"> {{ item.biblio.context }}</span></li>
        <li class="mt-2">Beschreibung: <br>{{ item.description }}</li>
        <li class="mt-2">Aufbewahrung: {{ item.archival.institution }}</li>
    </UnstyledList>
</template>
