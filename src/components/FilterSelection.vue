<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
import IconClose from "./icons/IconClose.vue";
import { ref } from "vue";
import { useDataStore } from "@/stores/data";
import type { mediaType } from '@/types/data';
/* @ts-ignore */
import translations from "@/assets/data/translations";
import { storeToRefs } from "pinia";

const store = useDataStore();
const { filteredData, filter, data } = storeToRefs(store);

const authors = data.value.reduce((allAuthors, item) => {
    const author = item.author;
    if (!allAuthors.includes(author) && ["Johann M. Kamps", "Paul Pörtner", "Paul Wühr"].includes(author)) {
        allAuthors.push(author);
    }
    return allAuthors.sort();
}, [] as string[]);

const contexts = data.value.reduce((contexts, item) => {
    const context = item.biblio.context;
    if (!contexts.includes(context) && context.length > 0) {
        contexts.push(context);
    }
    return contexts.sort();
}, [] as string[]);
</script>

<template>
    <div class="box is-flex is-flex-direction-column">
        <button class="button is-rounded close is-align-self-flex-end" aria-label="close" @click="() => $emit('close')">
            <IconClose />
        </button>
        <h4 class="title is-5">Filter auswählen</h4>
        <form @submit.prevent>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <h5 class="title is-6 mb-2">Nach Author / Urheber filtern</h5>
                        <div class="field mb-1" v-for="author in authors">
                            <input type="checkbox" class="is-checkradio"
                                @change="(store.filterByAuthor(author), store.filterContext = 'archive')"
                                :checked="filter.bibliographic.author?.includes(author)" :id="`check${author}`"
                                :name="`check${author}`" />
                            <label :for="`check${author}`">{{ author }}</label>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <h5 class="title is-6 mb-2">Nach Werkkontext filtern</h5>
                        <div class="field mb-1" v-for="context in contexts">
                            <input type="checkbox" class="is-checkradio"
                                @change="(store.filterByTitleOrId(context), store.filterContext = 'archive')"
                                :checked="filter.idOrTitle?.includes(context)" :id="`check${context}`"
                                :name="`check${context}`" />
                            <label :for="`check${context}`">{{ context }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="field">
                <h5 class="title is-6 mb-2">Auf Medientyp eingrenzen</h5>
                <div class="field mb-1" v-for="mediaType in ['audio', 'image']">
                    <input type="checkbox" class="is-checkradio"
                        @change="(store.filterByMediaType(mediaType as mediaType), store.filterContext = 'archive')"
                        :checked="filter.bibliographic.mediaType.includes(mediaType as mediaType)"
                        :id="`check${mediaType}`" :name="`check${mediaType}`" />
                    <label :for="`check${mediaType}`">{{ translations.translations.metadata[mediaType] }}</label>
                </div>
            </div>
            <hr />
            <div class="buttons field mt-2">
                <button class="button is-success" @click="() => $emit('close')">
                    Filter anwenden
                </button>
                <button class="button is-danger" @click="() => (store.reset(), $emit('close'))">
                    Filter zurücksetzen
                </button>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import 'bulma-checkradio';

.box {
    height: 100%;
    width: 100%;
    overflow: scroll;

}

.close {
    border: none;
}

.close svg {
    height: 2rem;
    width: 2rem;
}
</style>
