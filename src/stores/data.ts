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

type filterContext = 'search' | 'archive';

const options = {
  keys: ['id', 'biblio.title', 'biblio.context'],
};

const compareEntries = (a: entry, b: entry) => {
  if (a.showcase !== null && b.showcase !== null) {
    if (a.showcase[0] !== b.showcase[0]) {
      if (a.showcase[0] > b.showcase[0]) return 1;
      if (a.showcase[0] < b.showcase[0]) return -1;
      return 0;
    } else {
      if (a.showcase[1] > b.showcase[1]) return 1;
      if (a.showcase[1] < b.showcase[1]) return -1;
      return 0;
    }
  }
  return 0;
};

const entries: entry[] = data;

const fuse = new Fuse(entries, options);

export const useDataStore = defineStore('data', () => {
  const data: Ref<entry[]> = ref(entries);

  const filterContext: Ref<filterContext | undefined> = ref(undefined);

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
    filterContext.value = undefined;
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
            author: filter.value.bibliographic.author.includes(value)
              ? filter.value.bibliographic.author.filter((i) => i !== value)
              : [...filter.value.bibliographic.author, value],
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
        let results = data.value;
        results =
          filter.value.bibliographic.author.length > 0
            ? results
                .filter((i) =>
                  filter.value.bibliographic.author.includes(i.author)
                )
                .sort(compareEntries)
            : results.sort(compareEntries);
        filteredData.value =
          filter.value.bibliographic.mediaType.length > 0
            ? results
                .filter((i) =>
                  filter.value.bibliographic.mediaType.includes(i.metadata.type)
                )
                .sort(compareEntries)
            : results.sort(compareEntries);
        break;
      case 'titleOrId':
        const search = fuse.search(filter.value.idOrTitle as string);
        filteredData.value =
          search.length > 0
            ? search.map((i) => i.item).sort(compareEntries)
            : undefined;
        break;
      default:
        break;
    }
  };

  const total: ComputedRef<number> = computed(() => {
    if (filteredData.value) return filteredData.value.length;
    return data.value.length;
  });

  return {
    data,
    filterContext,
    filteredData,
    filter,
    filterByAuthor,
    filterByMediaType,
    filterByTitleOrId,
    total,
    reset,
  };
});
