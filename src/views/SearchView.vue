<script lang="ts" setup>
import Result from "@/components/Result.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { ref, onMounted, watch } from 'vue';
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const store = useDataStore();
const { filteredData } = storeToRefs(store);

const query = ref("")
const isLoading = ref(false)

function handleInput() {
    if (query.value.length >= 2) {
        store.filterByTitleOrId(query.value)
        isLoading.value = true
        setTimeout(() => {
            isLoading.value = false
        }, 750);
    } else {
        isLoading.value = false
    }

}

watch(query, () => {
    if (query.value.length === 0) {
        isLoading.value === false
        store.reset()
    }
})


onMounted(() => {
    /* do things on mount */
    store.reset()
});

</script>


<template>
    <section class="section">
        <div class="container box p-2">
            <input class="input" type="text" v-model="query" @submit.prevent @keypress="handleInput"
                placeholder="Nach Titel oder ID suchen">
        </div>
        <div class="container mt-6">
            <article class="message is-warning" v-if="query.length >= 2 && !filteredData">
                <div class="message-body">
                    Keine Ergebnissen gefunden für <span class="is-italic">{{ query }}</span>
                </div>
            </article>
            <article class="message is-danger" v-else-if="query.length > 0 && query.length < 2">
                <div class="message-body">
                    Mindestlänge für gesuchten Titel oder ID: 2
                </div>
            </article>
            <Result v-else-if="filteredData && !isLoading" :item="entry" :hr="index !== filteredData.length - 1"
                :context="'search'" :showImg="true" v-for="(entry, index) in filteredData" />
            <LoadingSpinner :class="'mt-6'" v-if="isLoading" />
        </div>

    </section>

</template>
