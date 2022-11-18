<script lang="ts" setup>
import Result from "@/components/Result.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import IconTrash from "@/components/icons/IconTrash.vue"
import { ref, onMounted, watch } from "vue";
import type { Ref } from 'vue'
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const store = useDataStore();
const { filter, filterContext, filteredData, data } = storeToRefs(store);

const query = ref("");
const isLoading = ref(false);
const suggestions = data.value.reduce((contexts, item) => {
    const context = item.biblio.context;
    if (!contexts.includes(context)) {
        contexts.push(context);
    }
    return contexts;
}, [] as string[]);

function handleInput() {
    if (query.value.length >= 2) {
        store.filterByTitleOrId(query.value);
        store.filterContext = 'search'
        isLoading.value = true;
        setTimeout(() => {
            isLoading.value = false;
        }, 750);
    } else {
        isLoading.value = false;
    }
}



watch(query, () => {
    if (query.value.length === 0) {
        isLoading.value === false;
        store.reset();
    }
});

onMounted(() => {
    /* do things on mount */
    if (filterContext.value !== 'search') {
        store.reset();
    } else if (filter.value.idOrTitle) {
        query.value = filter.value.idOrTitle;
        handleInput()
    }
});
</script>

<template>
    <section class="section">
        <div class="container box  p-2">

            <div class="is-flex">
                <input class="input pl-1" type="text" v-model="query" @submit.prevent @keypress="handleInput"
                    placeholder="Nach Titel oder Vitrine suchen" aria-haspopup="true" aria-controls="tahead-menu" />
                <button class="ml-1 button is-danger" v-on:click="(query = '', store.reset())"
                    :disabled="query.length === 0">
                    <IconTrash :style="'height: 1rem'" />
                </button>
            </div>
            <!-- <div class="dropdown">
                <div class="dropdown-trigger">
                    <input class="input" type="text" v-model="query" @submit.prevent @keypress="handleInput"
                        placeholder="Nach Titel oder ID suchen" aria-haspopup="true" aria-controls="tahead-menu" />
                </div>
                <div class="dropdown-menu" id="tahead-menu" role="menu" style="display: block;">
                    <div class="dropdown-content">
                        <div class="dropdown-item">Test</div>
                    </div>
                </div>
            </div> -->
            <div class="is-size-7 mt-4">
                Suchvorschläge: <span v-on:click="(query = suggestion, handleInput())" v-for="suggestion in suggestions"
                    class="tag mx-1" :class="{
                        'is-light': query.length > 0,
                        'is-primary': query.length === 0
                    }">{{ suggestion
}}</span>
            </div>
        </div>

        <div class="container mt-6">
            <article class="message is-warning" v-if="query.length >= 2 && !filteredData">
                <div class="message-body">
                    Keine Ergebnissen gefunden für
                    <span class="is-italic">{{ query }}</span>
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

<style scoped>
.dropdown,
.dropdown-trigger,
.dropdown-menu {
    width: 100%;
}

.dropdown-menu {
    margin-top: -0.1rem;
}
</style>
