<script lang="ts" setup>
import HeaderBar from '@/components/HeaderBar.vue';
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useDataStore();
const { data } = storeToRefs(store);
const entry = data.value.filter(i => i.id === route.params.id)[0]
</script>

<template>
    <section class="section">
        <div class="container" v-if="entry">
            <HeaderBar :title="entry.biblio.title" />
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
</template>
