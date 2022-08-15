import { defineStore } from 'pinia';
import Fuse from 'fuse.js';
import type { entry, mediaType } from '@/types/data';
import { ref, type Ref, computed, type ComputedRef } from 'vue';
/* @ts-ignore */
import data from '@/assets/data/data';

type filterType = 'author' | 'mediaType' | 'titleOrId';

interface filter {
  type: filterType | undefined;
  value: string | mediaType | undefined;
}

interface data {
  entries: entry[];
  filter: filter;
}

const options = {
  keys: ['id', 'biblio.title'],
};

const entries: entry[] = data;

const fuse = new Fuse(entries, options);

export const useDataStore = defineStore('data', () => {
  const data: Ref<data> = ref({
    entries,
    filter: {
      type: undefined,
      value: undefined,
    },
  });

  const reset = () => {
    data.value.filter = {
      type: undefined,
      value: undefined,
    };
  };

  const _setFilterType = (type: filterType, value: string | mediaType) => {
    data.value.filter = {
      type,
      value,
    };
  };

  const filterByAuthor = (author: string) => {
    _setFilterType('author', author);
  };

  const filterByMediaType = (type: mediaType) => {
    _setFilterType('mediaType', type);
  };

  const filterByTitleOrId = (query: string) => {
    _setFilterType('titleOrId', query);
  };

  const filteredEntries: ComputedRef<entry[] | undefined> = computed(() => {
    switch (data.value.filter.type) {
      case 'author':
        return data.value.entries.filter(
          (entry) => entry.author === data.value.filter.value
        );
      case 'mediaType':
        return data.value.entries.filter(
          (entry) => entry.metadata.type === data.value.filter.value
        );
      case 'titleOrId':
        const search = fuse.search(data.value.filter.value as string);
        return search.length > 0 ? search.map((i) => i.item) : undefined;
      default:
        return data.value.entries;
    }
  });

  return {
    data,
    filteredEntries,
    filterByAuthor,
    filterByMediaType,
    filterByTitleOrId,
    reset,
  };
});

/* export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    entries,
  }),
  getters: {
    filterByAuthor: (state) => {
      return (author: string) =>
        state.entries.filter((entry) => entry.author === author);
    },
    filterByMediaType: (state) => {
      return (type: mediaType) =>
        state.entries.filter((entry) => entry.metadata.type === type);
    },
    filterByTitleOrId: () => {
      return (query: string) => fuse.search(query);
    },
  },
}); */
