import { defineStore } from 'pinia';
import Fuse from 'fuse.js';
import type { entry, mediaType } from '@/types/data';
import { ref, type Ref, computed, type ComputedRef } from 'vue';
/* @ts-ignore */
import data from '@/assets/data/data';

type bibliographic = 'author' | 'mediaType';

type filterType = bibliographic | 'titleOrId';

interface biblioFilter {
  author: string[];
  mediaType: mediaType[];
}

interface filter {
  type: filterType | undefined;
  idOrTitle: string | undefined;
  bibliographic: biblioFilter;
}

interface data {
  entries: entry[];
  filteredEntries: entry[] | undefined;
  filter: filter;
}

const options = {
  keys: ['id', 'biblio.title'],
};

const entries: entry[] = data;

const fuse = new Fuse(entries, options);

export const useDataStore = defineStore('data', () => {
  const data = entries;

  const filter: Ref<filter> = ref({
    type: undefined,
    idOrTitle: undefined,
    bibliographic: {
      author: [],
      mediaType: [],
    },
  });

  const filteredData: Ref<entry[] | undefined> = ref(undefined);

  const reset = () => {
    filter.value = {
      type: undefined,
      idOrTitle: undefined,
      bibliographic: {
        author: [],
        mediaType: [],
      },
    };
    filteredData.value = undefined;
  };

  const _setFilterType = (type: filterType, value: string) => {
    switch (type) {
      case 'titleOrId':
        filter.value = {
          type,
          idOrTitle: value,
          bibliographic: {
            author: [],
            mediaType: [],
          },
        };
        break;
      case 'author':
        filter.value = {
          type,
          idOrTitle: undefined,
          bibliographic: {
            author: [...filter.value.bibliographic.author, value],
            mediaType: filter.value.bibliographic?.mediaType,
          },
        };
        break;
      case 'mediaType':
        filter.value = {
          type,
          idOrTitle: undefined,
          bibliographic: {
            author: filter.value.bibliographic.author,
            mediaType: [
              ...filter.value.bibliographic.mediaType,
              value as mediaType,
            ],
          },
        };
        break;
      default:
        reset();
        break;
    }
    filterEntries();
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

  const filterEntries = (): void => {
    switch (filter.value.type) {
      case 'author':
      case 'mediaType':
        let results = filteredData.value ? filteredData.value : data;
        results =
          filter.value.type === 'author'
            ? results.filter((i) =>
                filter.value.bibliographic.author.includes(i.author)
              )
            : results;
        filteredData.value =
          filter.value.type === 'mediaType'
            ? results.filter((i) =>
                filter.value.bibliographic.mediaType.includes(i.metadata.type)
              )
            : results;
        break;
      case 'titleOrId':
        const search = fuse.search(filter.value.idOrTitle as string);
        filteredData.value =
          search.length > 0 ? search.map((i) => i.item) : undefined;
        break;
      default:
        break;
    }
  };

  const total: ComputedRef<number> = computed(() => {
    if (filteredData.value) return filteredData.value.length;
    return data.length;
  });

  return {
    data,
    filteredData,
    filter,
    filterByAuthor,
    filterByMediaType,
    filterByTitleOrId,
    total,
    reset,
  };
});
