<script setup lang="ts">
import IconPrev from "./icons/IconPrev.vue";
import IconZoomOut from "./icons/IconZoomOut.vue";
import IconReset from "./icons/IconReset.vue";
import IconZoomIn from "./icons/IconZoomIn.vue";
import IconNext from "./icons/IconNext.vue";
import IconMax from "./icons/IconMax.vue";
import IconShrink from "./icons/IconShrink.vue";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import type { entry } from "@/types/data";
import { computed, ref, onMounted, onUnmounted, type Ref } from "vue";
import { imageUrl } from "@/lib/utils";

type modes = 'regular' | 'fullscreen';

const props = defineProps<{
    item: entry;
    width: string;
}>();

const mode: Ref<modes> = ref('regular')

const svg = ref<SVGElement>();
const g = ref<SVGGElement>();
const htmlImg = ref<HTMLImageElement>();
const w = ref(0);
const h = ref(0);
const img = new Image();
const index = ref(0);
const transformStyles = ref({
    scale: 0,
    translateX: 0,
    translateY: 0,
});

const viewBox = computed(() => `0 0 ${w.value} ${h.value}`);

const setImage = () => {
    w.value = img.naturalWidth;
    h.value = img.naturalHeight;
    if (svg.value && g.value && htmlImg.value) {
        htmlImg.value.setAttribute("width", w.value.toString());
        htmlImg.value.setAttribute("height", h.value.toString());
        htmlImg.value.appendChild(img);
        select(svg.value as SVGElement).call(imgZoom as any);
    }
};

const handleZoom = (e: any) => {
    const { k, x, y } = e.transform;
    transformStyles.value.scale = k;
    transformStyles.value.translateX = x;
    transformStyles.value.translateY = y;
};

const imgZoom = zoom().on("zoom", handleZoom);

const pageForward = () => {
    index.value = index.value + 1;
    if (props.item.metadata.files) {
        const src = new URL(
            `../assets/data/images/${props.item.metadata.files[index.value]}`,
            import.meta.url
        ).href;
        img.src = src;
    }
};

const pageBackwards = () => {
    index.value = index.value - 1;
    if (props.item.metadata.files) {
        const src = new URL(
            `../assets/data/images/${props.item.metadata.files[index.value]}`,
            import.meta.url
        ).href;
        img.src = src;
    }
};

const zoomIn = () => {
    /*@ts-ignore*/
    select(g.value as SVGGElement)
        /*@ts-ignore*/
        .transition()
        .call(imgZoom.scaleBy as any, 2);
};

const zoomOut = () => {
    /*@ts-ignore*/
    select(g.value as SVGGElement)
        /*@ts-ignore*/
        .transition()
        .call(imgZoom.scaleBy as any, 0.5);
};

const resetZoom = () => {
    /*@ts-ignore*/
    select(g.value as SVGGElement).call(imgZoom.scaleTo, 1);
};

onMounted(() => {
    const src = imageUrl(props.item);
    if (src) {
        img.src = src;
        img.alt = props.item.biblio.title;
    }

    img.addEventListener("load", setImage);
    select(svg.value as SVGElement).call(imgZoom.scaleTo as any, 1);
});

onUnmounted(() => {
    img.removeEventListener("load", setImage);
});
</script>

<template>
    <div class="has-background-light box px-0 pt-0" :class="{ 'is-fullscreen': mode === 'fullscreen' }">
        <div class="buttons are-normal has-addons has-background-primary-light p-0 is-justify-content-space-between">
            <button class="button" @click="pageBackwards" :disabled="!(index - 1 >= 0)">
                <span class="icon">
                    <IconPrev />
                </span>
            </button>
            <button class="button" @click="zoomOut">
                <span class="icon">
                    <IconZoomOut />
                </span>
            </button>
            <button class="button" @click="resetZoom">
                <span class="icon">
                    <IconReset />
                </span>
            </button>
            <button class="button" @click="mode = mode === 'regular' ? 'fullscreen' : 'regular'">
                <span class="icon">
                    <IconMax v-if="mode === 'regular'" />
                    <IconShrink v-else />
                </span>
            </button>
            <button class="button" @click="zoomIn">
                <span class="icon">
                    <IconZoomIn />
                </span>
            </button>
            <button class="button" @click="pageForward" :disabled="
                !(
                    item.metadata.files !== undefined &&
                    index + 1 < item.metadata.files.length
                )
            ">
                <span class="icon">
                    <IconNext />
                </span>
            </button>
        </div>
        <div class="p-2">
            <svg ref="svg" :viewBox="viewBox" :style="{
                width: width + '%' || w + 'px',
                height: '100%',
                maxHeight: '100%',
            }">
                <g ref="g" :style="{
                    scale: transformStyles.scale,
                    transform: `translate(${transformStyles.translateX}px, ${transformStyles.translateY}px)`,
                }">
                    <foreignObject ref="htmlImg" />
                </g>
            </svg>
        </div>
    </div>
</template>

<style scoped lang="scss">
.is-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999
}
.button {
    background-color: none;
    background: none;
    margin: 0 !important;
    border-radius: 0;
    border: none;
    color: white;

    &:active,
    &:focus {
        color: white;
    }

    &:hover {
        color: $warning;
    }

    &:disabled {
        border: none;
        background: none;
    }

    svg {
        height: 1rem;
    }
}
</style>
