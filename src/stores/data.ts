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
  keys: ['biblio.title', 'biblio.context'],
  includeScore: true,
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
  const data: Ref<entry[]> = ref(entries.sort(compareEntries));

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
        if (filter.value.idOrTitle !== undefined) {
          if (filter.value.idOrTitle.match(/^\d?,?\d?$/) !== null) {
            const query = filter.value.idOrTitle;
            let results;
            if (query.match(/^\d,?$/) !== null) {
              const showroom = Number(query.split(',')[0]);
              results = data.value.filter(
                (i) => i.showcase !== null && i.showcase[0] === showroom
              );
            } else if (query.startsWith(',')) {
              const object = Number(query.split(',')[1]);
              results = data.value.filter(
                (i) => i.showcase !== null && i.showcase[1] === object
              );
            } else {
              const showcaseTuple = query.split(',').map((i) => Number(i));
              results = data.value.filter(
                (i) =>
                  i.showcase !== null &&
                  i.showcase[0] === showcaseTuple[0] &&
                  i.showcase[1] === showcaseTuple[1]
              );
            }
            filteredData.value = results.length > 0 ? results : undefined;
          } else {
            /*  const query = filter.value.idOrTitle
              .toLocaleLowerCase()
              .split(' ')
              .filter((i) => i.length > 0);
            const results = data.value.filter((i) =>
              query.some(
                (w) =>
                  i.biblio.context.toLowerCase().includes(w) ||
                  i.biblio.title.toLowerCase().includes(w)
              )
            ); */
            const query = filter.value.idOrTitle.toLocaleLowerCase();
            const results = data.value.filter(
              (i) =>
                i.biblio.context.toLowerCase().includes(query) ||
                i.biblio.title.toLowerCase().includes(query)
            );
            filteredData.value = results.length > 0 ? results : undefined;
          }

          /* const search = fuse.search(filter.value.idOrTitle as string);
        console.log(search.map((i) => i.item));
        filteredData.value =
          search.length > 0
            ? search.map((i) => i.item).sort(compareEntries)
            : undefined; */
        } else {
          filteredData.value = undefined;
        }
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
