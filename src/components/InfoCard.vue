<script lang="ts" setup>
import type { entry } from "@/types/data";
import UnstyledList from "@/components/UnstyledList.vue";
/*@ts-ignore*/
import translations from "@/assets/data/translations";

const props = defineProps<{
    item: entry;
}>();

const hasEmptyKeys = (object: Object) => {
    let empty = undefined;
    for (const prop in object) {
        if (empty === undefined && (prop === null || prop.length === 0)) {
            empty = true;
        } else {
            empty = false;
        }
    }
    return empty;
}


</script>

<template>


    <div class="card p-2">
        <UnstyledList>
            <li class="mb-1"><b>Bibliographische Informationen</b></li>
            <li class="my-2" v-if="item.biblio.description"><span class="has-text-weight-medium">Anmerkung</span>: <span
                    v-html="item.biblio.description"></span></li>
            <li v-if="item.author !== null && item.author.length > 0"><span class="has-text-weight-medium">Autor</span>:
                {{ item.author }}</li>
            <li>
                <span class="has-text-weight-medium">Werkkontext</span>: <span class="is-italic"> {{ item.biblio.context
                }}</span>
            </li>
            <!-- <li>Dokumenttyp: Entwurf | Notiz | Brief</li> -->
            <li v-if="item.biblio.type !== null"><span class="has-text-weight-medium">Texttyp</span>: {{
                    translations.translations.biblio[item.biblio.type]
            }}</li>
            <li v-if="item.media !== null"><span class="has-text-weight-medium">Dokumenttyp</span>: {{
                    translations.translations.media[item.media]
            }}</li>

            <div class="mt-2" v-if="item.biblio.type === 'tape'">
                <li><span class="has-text-weight-medium">Erstsendung</span>: {{ item.biblio.dateBroadcast }}</li>
                <li><span class="has-text-weight-medium">Dauer</span>: {{ item.biblio.additional?.duration }}min</li>
                <li><span class="has-text-weight-medium">Regie</span>: {{ item.biblio.additional?.producer }}</li>
                <li><span class="has-text-weight-medium">Rundfunkanstalt</span>: {{ item.biblio.radiostation }}</li>
                <li v-if="item.biblio.additional?.cast"><span class="has-text-weight-medium">Weitere Beteiligte</span>:
                    {{ item.biblio.additional?.cast.join(', ') }}</li>
            </div>
            <div v-else>
                <li v-if="item.biblio.year">
                    Datierung / Erscheinungsjahr: {{ item.biblio.year }}
                </li>
            </div>
            <li v-if="item.metadata.copyright"><span class="has-text-weight-medium">Copyright</span>: ©{{
                    item.metadata.copyright
            }}</li>
        </UnstyledList>
    </div>
    <div class="card p-2 mt-4" v-if="hasEmptyKeys(item.archival)">

        <UnstyledList>
            <li class="mb-1"><b>Archivalische Informationen</b></li>
            <div v-if="item.media !== 'audio'">
                <li class="my-2">
                    <span class="has-text-weight-medium">Kurzbeschreibung</span>: {{ item.archival.description }}
                </li>
                <li><span class="has-text-weight-medium">Format</span>: {{ item.archival.format }}</li>
                <li><span class="has-text-weight-medium">Umfang</span>: {{ item.archival.scope }}</li>
            </div>
            <li><span class="has-text-weight-medium">Standort / Institution</span>: {{ item.archival.institution }}</li>
            <li v-if="item.archival.id"><span class="has-text-weight-medium">Signatur / Mappe</span>:
                {{ item.archival.id }}</li>

        </UnstyledList>
    </div>
</template>
