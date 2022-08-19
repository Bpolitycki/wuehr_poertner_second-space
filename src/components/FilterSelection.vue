<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
import IconClose from "./icons/IconClose.vue";
import { ref } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const store = useDataStore();
const { filteredData, filter, data } = storeToRefs(store);

const authors = data.value.reduce((allAuthors, item) => {
  const author = item.author;
  if (!allAuthors.includes(author)) {
    allAuthors.push(author);
  }
  return allAuthors;
}, [] as string[]);
</script>

<template>
  <div class="box is-flex is-flex-direction-column">
    <button
      class="button is-rounded close is-align-self-flex-end"
      aria-label="close"
      @click="() => $emit('close')"
    >
      <IconClose />
    </button>
    <h4 class="title is-4">Filter auswählen</h4>

    <form @submit.prevent>
      <div class="field mb-3">
        <h5 class="title is-5 mb-3">Nach Author / Urheber filtern</h5>
        <label class="checkbox mr-1" v-for="author in authors">
          <input
            type="checkbox"
            @change="store.filterByAuthor(author)"
            :checked="filter.bibliographic.author?.includes(author)"
          />
          {{ author }}
        </label>
      </div>
      <hr />
      <!-- <div class="field">
                <label class="label" for="selectAuthor">Nach Autor / Urheber filtern</label>
                <div class="control">
                    <div class="select">
                        <select name="selectAuthor" id="selectAuthor">
                            <option selected value=""></option>
                            <option v-for="author in authors" v-bind:value="author"
                                @select="store.filterByAuthor(author)" >{{ author }}</option>
                        </select>
                    </div>
                </div>
            </div> -->
      <div class="buttons field">
        <button class="button is-success" @click="() => $emit('close')">
          Filter anwenden
        </button>
        <button
          class="button is-danger"
          @click="() => (store.reset(), $emit('close'))"
        >
          Filter zurücksetzen
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.box {
  height: 100%;
  width: 100%;
}

.close {
  border: none;
}

.close svg {
  height: 2rem;
  width: 2rem;
}
</style>
