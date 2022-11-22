<script setup lang="ts">
import Filters from "@/components/Filters.vue";
import Result from "@/components/Result.vue";
import { useDataStore } from "@/stores/data";
import { useScrollPosition } from "@/stores/scroll";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";

const store = useDataStore();
const { filterContext, filteredData, data } = storeToRefs(store);
const scrollStore = useScrollPosition()
const { topPos, leaveContext } = storeToRefs(scrollStore)

onMounted(() => {
    if (filterContext.value !== 'archive') {
        store.reset();
    }
    if (leaveContext.value && topPos.value && leaveContext.value === 'material') {
        window.scrollTo({ top: topPos.value })
    }

})

onUnmounted(() => {
    topPos.value = window.scrollY
    leaveContext.value = 'material'
})
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
            <div v-if="filteredData !== undefined">
                <Result :item="entry" :hr="index !== filteredData.length - 1" :context="'material'" :showImg="true"
                    v-for="(entry, index) in filteredData" :key="entry.id" />
            </div>
            <div v-else>
                <Result :item="entry" :hr="index !== data.length - 1" :context="'material'" :showImg="true"
                    v-for="(entry, index) in data" :key="entry.id" />
            </div>
        </div>
    </section>
</template>
