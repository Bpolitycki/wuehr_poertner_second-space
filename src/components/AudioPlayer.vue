<script setup lang="ts">
import IconPlay from './icons/IconPlay.vue'
import IconPause from './icons/IconPause.vue'
import IconX from './icons/IconX.vue'
import { onMounted, ref, watch } from 'vue';
import { useAudioStore } from "@/stores/audio";
import { storeToRefs } from "pinia";
import { secToMin } from '@/lib/utils'


const store = useAudioStore();
const { audioUrl, isPlaying, item, time } = storeToRefs(store);
const audio = ref<HTMLAudioElement>();
const audioIsReady = ref(false)


const startStop = (): void => {
    store.startStop(!isPlaying.value)
}


watch(isPlaying, () => {

    if (audio.value) {
        if (isPlaying.value && audio.value.paused) {
            audio.value.play()
        } else if (!isPlaying.value && !audio.value.paused) {
            audio.value.pause()
        }
    }

})


onMounted(() => {
    if (audio.value) {
        console.log(audio)
    }

})

</script>

<template>
    <div v-if="item" class="has-background-light wrapper px-6 py-4">
        <RouterLink :to="`/material/${item.id}?context=material`">
            <div class="player mx-auto is-flex is-justify-content-space-between is-align-items-center">
                <h6 class="title p-0 m-0 is-4">{{ item?.biblio.title }} </h6>
                <span class="time has-text-weight-semibold has-text-black is-size-4">
                    {{ secToMin(time) }} / <span v-if="audio">{{ secToMin(audio.duration) }}</span><span
                        v-else>--:--</span>
                </span>
                <div class="has-text-black">
                    <IconPlay v-if="!isPlaying && audioIsReady" @click.prevent="startStop" />
                    <IconPause v-else-if="isPlaying && audioIsReady" @click.prevent="startStop" />
                    <span class=" loader" v-else></span>
                    <IconX :class="'ml-2'" @click.prevent="() => store.resetAudio()" />
                </div>
                <audio :src="audioUrl" ref="audio" @canplay="() => { audioIsReady = true, audio?.play() }"
                    @timeupdate="(e: any) => store.updateTime(e.target.currentTime)"></audio>
            </div>
        </RouterLink>
    </div>
</template>


<style lang="scss" scoped>
div.wrapper {
    position: fixed;
    z-index: 89;
    left: 0;
    bottom: $navbar-height;
    width: 100vw;
    height: calc($navbar-height + $navbar-height / 2);

    div.player {
        width: 75%;
        color: black !important;

        svg {
            height: 3rem;
            width: 3rem;
        }

        .loader {
            color: #ffffff;
            font-size: 45px;
            text-indent: -9999em;
            overflow: hidden;
            width: 0.75em;
            height: 0.75em;
            border-radius: 50%;
            position: relative;
            transform: translateZ(0);
            animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
            color: $primary;

        }

        @keyframes mltShdSpin {
            0% {
                box-shadow: 0 -0.83em 0 -0.4em,
                    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
                    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
            }

            5%,
            95% {
                box-shadow: 0 -0.83em 0 -0.4em,
                    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
                    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
            }

            10%,
            59% {
                box-shadow: 0 -0.83em 0 -0.4em,
                    -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em,
                    -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
            }

            20% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
                    -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
                    -0.749em -0.34em 0 -0.477em;
            }

            38% {
                box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
                    -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
                    -0.82em -0.09em 0 -0.477em;
            }

            100% {
                box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em,
                    0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
            }
        }

        @keyframes round {
            0% {
                transform: rotate(0deg)
            }

            100% {
                transform: rotate(360deg)
            }
        }
    }

}
</style>
