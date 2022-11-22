<script setup lang="ts">
import SimpleImage from "@/components/SimpleImage.vue";
import UnstyledList from "@/components/UnstyledList.vue";
import type { entry } from "@/types/data";
import { toRefs } from "vue";
/* @ts-ignore */
import translations from "@/assets/data/translations";
import { imageUrl } from "@/lib/utils";
const props = defineProps<{
    item: entry;
    hr: boolean;
    context: string;
    showImg: boolean;
}>();

const { item } = toRefs(props);
const image = imageUrl(item.value);
</script>

<template>
    <div class="content">
        <RouterLink class="has-text-info" :to="`/material/${item.id}?context=${context}`">
            <div class="columns">
                <div class="column is-flex is-4 p-0" v-if="showImg">

                    <SimpleImage :img="image" :type="item.metadata.type" />

                </div>
                <div class="column is-flex is-flex-direction-column is-justify-content-space-between"
                    :class="{ 'is-8': showImg }">
                    <div>
                        <h5 class="title is-5 has-text-primary" v-html="item.biblio.titleDisplay"></h5>
                        <UnstyledList class="has-text-black">
                            <li
                                v-if="item.media !== 'audio' && item.showcase !== null && !item.biblio.context.includes('Soundseeing')">
                                <span class="has-text-weight-medium">Vitrine</span>: {{ item.showcase[0] }} / <span
                                    class="has-text-weight-medium">Exponat</span>: {{ item.showcase[1] }}
                            </li>
                            <li>
                                <span class="has-text-weight-medium">Werkkontext</span>:
                                <span class="is-italic">{{ item.biblio.context }}</span>
                            </li>
                            <li v-if="item.biblio.type !== null">
                                <span class="has-text-weight-medium">Texttyp</span>: {{
                                        translations.translations.biblio[item.biblio.type]
                                }}
                            </li>
                            <li v-if="item.media !== null">
                                <span class="has-text-weight-medium">Dokumenttyp</span>: {{
                                        translations.translations.media[item.media]
                                }}
                            </li>
                        </UnstyledList>
                    </div>
                </div>
            </div>
        </RouterLink>
        <hr v-if="hr" />
    </div>
</template>
