<script lang="ts" setup>
import Result from "@/components/Result.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import IconTrash from "@/components/icons/IconTrash.vue"
import { ref, onMounted, onUnmounted, watch } from "vue";
import type { Ref } from 'vue'
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import IconInfo from "@/components/icons/IconInfo.vue";
import IconClose from "@/components/icons/IconClose.vue";
import UnstyledListVue from "@/components/UnstyledList.vue";
import { useScrollPosition } from "@/stores/scroll";

const store = useDataStore();
const { filter, filterContext, filteredData, data } = storeToRefs(store);
const scrollStore = useScrollPosition()
const { topPos, leaveContext } = storeToRefs(scrollStore)

const query = ref("");
const isLoading = ref(false);
const searchFromNav = ref(false);
const suggestions: [string[], string[]] = [['Interaktionen', 'Blitzlicht'], ['Soundseeing Metropolis München', 'Preislied', 'So eine Freiheit']]

function handleInput() {
    store.filterByTitleOrId(query.value);
    store.filterContext = 'search'
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 750);
}

function instantSearch() {
    searchFromNav.value = true
    isLoading.value = false
    store.filterByTitleOrId(query.value);
    store.filterContext = 'search'
    searchFromNav.value = false

}



watch(query, () => {
    if (query.value.length === 0) {
        isLoading.value === false;
        store.reset();
    } else if (!searchFromNav.value) {
        handleInput()
    }
});

onMounted(() => {
    /* do things on mount */
    if (filterContext.value !== 'search') {
        store.reset();
    } else if (filter.value.idOrTitle) {
        query.value = filter.value.idOrTitle;
        instantSearch()
    }

    if (leaveContext.value && topPos.value && leaveContext.value === 'search') {
        window.scrollTo({ top: topPos.value })
    }
});

onUnmounted(() => {
    topPos.value = window.scrollY
    leaveContext.value = 'search'
})
</script>

<template>
    <section class="section">
        <div class="container box  p-2">

            <div class="is-flex">
                <input class="input pl-1" type="text" v-model="query" @submit.prevent placeholder="Nach Titel suchen"
                    aria-haspopup="true" aria-controls="tahead-menu" />
                <button class="button is-danger mx-1" v-on:click="(query = '', store.reset())"
                    :disabled="query.length === 0">
                    <IconTrash :style="'height: 1rem'" />
                </button>
            </div>
            <div class="is-size-7 mt-4">
                Suchvorschläge: <span v-on:click="(query = suggestion, handleInput())"
                    v-for="suggestion in suggestions[0]" class="tag mx-1" :class="{
                    'is-light': query.length > 0,
                    'is-primary': query.length === 0
                }">{{ suggestion
                    }}</span>
                <span v-on:click="(query = suggestion, handleInput())" v-for="suggestion in suggestions[1]"
                    class="tag mx-1" :class="{
                    'is-light': query.length > 0,
                    'is-warning': query.length === 0
                }">{{ suggestion
                    }}</span>
            </div>
        </div>
        <div class="container mt-6">
            <article class="message is-warning" v-if="query.length > 0 && !filteredData">
                <div class="message-body">
                    Keine Ergebnissen gefunden für
                    <span class="is-italic">{{ query }}</span>
                </div>
            </article>
            <!-- <article class="message is-danger" v-else-if="query.length > 0 && query.length < 1">
                <div class="message-body">
                    Mindestlänge für Suchanfragen: 1
                </div>
            </article> -->

            <Result v-else-if="filteredData && !isLoading" :item="entry" :hr="index !== filteredData.length - 1"
                :context="'search'" :showImg="true" v-for="(entry, index) in filteredData" :key="entry.id" />
            <LoadingSpinner :class="'mt-6'" v-if="isLoading" />
        </div>
    </section>
</template>

<style scoped>
.dropdown,
.dropdown-trigger,
.dropdown-menu {
    width: 100%;
}

.dropdown-menu {
    margin-top: -0.1rem;
}

.close {
    border: none;
}

.close svg {
    height: 2rem;
    width: 2rem;
}
</style>