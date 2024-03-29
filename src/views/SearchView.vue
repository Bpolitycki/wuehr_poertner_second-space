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

const showInfo = ref(false)
const query = ref("");
const isLoading = ref(false);
const searchFromNav = ref(false);
const suggestions: [string[], string[]] = [['Interaktionen', 'Blitzlicht', 'Börsenspiel', 'Alea'], ['Soundseeing Metropolis München', 'Preislied', 'Verirrhaus', 'So eine Freiheit']]

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
                <input class="input pl-1" type="text" v-model="query" @submit.prevent
                    placeholder="Nach Titel oder Vitrine und Exponat suchen" aria-haspopup="true"
                    aria-controls="tahead-menu" />
                <button class="button is-info mx-1" v-on:click="showInfo = true">
                    <IconInfo :style="'height: 1rem'" />
                </button>
                <button class="button is-danger" v-on:click="(query = '', store.reset())"
                    :disabled="query.length === 0">
                    <IconTrash :style="'height: 1rem'" />
                </button>
            </div>
            <div class="modal" :class="{ 'is-active': showInfo }">
                <div class="modal-background" @click="() => showInfo = false"></div>
                <div class="modal-content">
                    <div class="box is-flex is-flex-direction-column pr-0">
                        <button class="button is-rounded close is-align-self-flex-end" aria-label="close"
                            @click="() => showInfo = false">
                            <IconClose />
                        </button>
                        <h6 class=" title is-6 mx-4">Erläuterung zur Suche</h6>
                        <p class="mb-4 mx-4">In im sog. ‚second Space‘ kann entweder nach dem Titel eines Exponats oder
                            nach
                            der Nummer
                            eines Ausstellungsobjekt gesucht werden. Die Nummer eines Objekts ist codiert durch die
                            Nummer der Vitrine und des Exponats
                            – diese findet sich auf dem jeweiligen Legendentext. Beispiele:
                        </p>
                        <UnstyledListVue :class="'mx-4 mb-3'">
                            <li><span class="has-text-weight-medium">6,3</span>: Suche nach Vitrine 6 Exponat 3</li>
                            <li><span class="has-text-weight-medium">6</span>: Suche nach Vitrine 6</li>
                            <li><span class="has-text-weight-medium">,3</span>: Suche nach allen Exponaten 3</li>
                        </UnstyledListVue>
                    </div>
                </div>
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
