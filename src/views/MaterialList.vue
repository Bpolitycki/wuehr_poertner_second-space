<script setup lang="ts">
import Filters from "@/components/Filters.vue";
import Result from "@/components/Result.vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const store = useDataStore();
const { filteredData, data } = storeToRefs(store);
</script>

<template>
    <section class="section">
        <div class="container is-flex is-justify-content-space-between is-align-items-center box p-4">
            <span class="count">{{ store.total }}
                {{
                        `Austellungsobjekt${store.total > 1 || store.total === 0 ? "e" : ""}`
                }}
                gefunden</span>
            <Filters />
        </div>
        <div class="container mt-6">
            <div v-if="filteredData">
                <Result :item="entry" :hr="index !== filteredData.length - 1" :context="'material'" :showImg="true"
                    v-for="(entry, index) in filteredData" />
            </div>
            <div v-else>
                <Result :item="entry" :hr="index !== data.length - 1" :context="'material'" :showImg="true"
                    v-for="(entry, index) in data" />
            </div>
        </div>
    </section>
</template>
