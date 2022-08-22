l
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import IconHome from "./components/icons/IconHome.vue";
import IconSearch from "./components/icons/IconSearch.vue";
import IconExpand from "./components/icons/IconExpand.vue";
import AudioPlayer from './components/AudioPlayer.vue';
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
    <main>
        <RouterView :key="route.fullPath" />
        <AudioPlayer />
    </main>

    <footer>
        <nav class="navbar is-fixed-bottom has-shadow is-size-6" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-menu is-justify-content-space-between px-6">
                    <RouterLink class="navbar-item" to="/">
                        <IconHome /> Startseite
                    </RouterLink>
                    <RouterLink class="navbar-item" to="/material">
                        <IconExpand /> Material
                    </RouterLink>
                    <RouterLink class="navbar-item" to="/search">
                        <IconSearch /> Suche
                    </RouterLink>
                </div>
            </div>
        </nav>
    </footer>
</template>

<style lang="scss">
main {
    min-height: calc(100vh - $navbar-height);
}

.navbar {
    .navbar-menu {
        svg {
            height: 1rem;
            margin-right: 0.5rem;
        }

        .router-link-active {
            color: $primary;
        }
    }
}
</style>
