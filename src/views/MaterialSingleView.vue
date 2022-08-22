<script lang="ts" setup>
import HeaderBar from '@/components/HeaderBar.vue';
import ImageZoom from '@/components/ImageZoom.vue'
import InfoCard from '@/components/InfoCard.vue'
import Result from '@/components/Result.vue';
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';



const route = useRoute();
const store = useDataStore();
const { data } = storeToRefs(store);
const entry = data.value.filter(i => i.id === route.params.id)[0]
const relatedEntries = data.value.filter(i => i.biblio.context === entry.biblio.context && i.id !== entry.id)

</script>

<template>
    <section class="section">
        <div class="container" v-if="entry">
            <HeaderBar :item="entry" />
            <div class="columns mt-2">
                <div class="column">
                    <ImageZoom :item="entry" :width="'100'" />
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

    <secion class="section">
        <div class="container">
            <h5 class="title is-5">Verwandte Einträge</h5>
            <div class="related-wrapper is-flex  mb-4 has-background-light p-2">
                <Result :class="'card mx-2 p-2 pb-4 is-flex is-flex-shrink-0'" v-for="relEntry in relatedEntries"
                    :context="'material'" :item="relEntry" :hr="false" :showImg="false" />
            </div>

        </div>
    </secion>
</template>

<style lang="scss" scoped>
.related-wrapper {

    overflow-x: scroll;

    .card {

        height: 250px;
        width: 250px
    }
}
</style>
