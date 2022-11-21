<script lang="ts" setup>
import HeaderBar from "@/components/HeaderBar.vue";
import ImageZoom from "@/components/ImageZoom.vue";
import InfoCard from "@/components/InfoCard.vue";
import Result from "@/components/Result.vue";
import StartStopIcon from "@/components/StartStopIcon.vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useDataStore();
const { data } = storeToRefs(store);
const entry = data.value.filter((i) => i.id === route.params.id)[0];
const relatedEntries = data.value.filter(
    (i) => i.biblio.context === entry.biblio.context && i.id !== entry.id
);
</script>

<template>
    <section class="section">
        <div class="container" v-if="entry">
            <HeaderBar :item="entry" />
            <div class="">
                <h4 class="title is-4">{{ entry.biblio.title }}</h4>
                <h5 class="subtitle is-5" v-if="entry.biblio.subtitle">
                    {{ entry.biblio.subtitle }}
                </h5>
                <h6 v-if="entry.media !== 'audio' && entry.showcase !== null && !entry.biblio.context.includes('Soundseeing')"
                    class="subtitle is-6">Vitrine: {{
                            entry.showcase[0]
                    }} /
                    Exponat: {{ entry.showcase[1] }}
                </h6>
            </div>
            <div class="columns mt-3">
                <div class="column">
                    <ImageZoom v-if="entry.metadata.type === 'image'" :item="entry" :width="'100'" />
                    <StartStopIcon :entry="entry" v-else />
                </div>
                <div class="column">
                    <InfoCard :item="entry" />
                </div>
            </div>
        </div>
        <article class="message is-danger" v-else>
            <div class="message-header">
                <p>Error</p>
            </div>
            <div class="message-body">
                Eintrag mit der ID {{ $route.params.id }} konnte nicht gefunden werden!
            </div>
        </article>
    </section>

    <secion class="section" v-if="relatedEntries.length > 0">
        <div class="container">
            <h5 class="title is-5">Verwandte Einträge</h5>
            <div class="related-wrapper is-flex mb-4 has-background-light p-2">
                <Result :class="'card mx-2 p-2 pb-4 is-flex is-flex-shrink-0 is-size-65'"
                    v-for="relEntry in relatedEntries" :context="'material'" :item="relEntry" :hr="false"
                    :showImg="false" />
            </div>
        </div>
    </secion>
</template>

<style lang="scss" scoped>
.related-wrapper {
    overflow-x: scroll;

    .card {
        height: 250px;
        width: 250px;
    }
}
</style>
