<script setup lang="ts">
import type { entry } from "@/types/data";
import { useRouter, useRoute } from "vue-router";
import IconArrowLeft from "./icons/IconArrowLeft.vue";
import IconHome from "./icons/IconHome.vue"

defineProps<{
    item: entry
}>();


const router = useRouter();
const route = useRoute()
</script>

<template>
    <header class="is-flex is-align-items-center">
        <a class="is-flex" role="button" @click.prevent="() => router.back()">
            <IconArrowLeft />
        </a>
        <nav class="breadcrumb is-right mx-auto is-small" aria-label="breadcrumbs">
            <ul>
                <li>
                    <RouterLink to="/"><span class="icon is-small">
                            <IconHome />
                        </span></RouterLink>
                </li>
                <li>
                    <RouterLink v-if="route.query.context === 'material'" to="/material">
                        Material
                    </RouterLink>
                    <RouterLink v-else to="/search">
                        Suche
                    </RouterLink>
                </li>
                <li class="is-active"><a class="has-text-black" href="#" aria-current="page">{{ item.biblio.title }}</a>
                </li>
            </ul>
        </nav>
    </header>
    <hr class="mt-2">

</template>

<style scoped lang="scss">
a {
    color: $primary  !important;

    &[role='button'] {
        svg {
            height: calc($size-6 * 2);
        }
    }
}
</style>
