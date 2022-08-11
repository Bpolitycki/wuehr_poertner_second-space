<script setup lang="ts">
import Filters from '@/components/Filters.vue';
import { ref } from 'vue'
import { useDataStore } from '@/stores/data';

const store = useDataStore();
const entries = ref(store.filteredEntries);

</script>

<template>
    <section class="section">
        <div class="container is-flex is-justify-content-space-between is-align-items-center mb-6" v-if="entries">
            <span class="count">{{ entries?.length }} {{ `Austellungsobjekt${entries?.length > 1 || entries?.length ===
                    0
                    ?
                    'e' : ''}`
            }}</span>
            <Filters />
        </div>
    </section>
</template>
