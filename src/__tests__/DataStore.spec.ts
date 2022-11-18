import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useDataStore } from "@/stores/data";
import type { mediaType } from "@/types/data";

describe("All items in filteredEntries", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  for (const author of ["Paul Wühr"]) {
    it(`should belong to ${author} as author`, () => {
      const data = useDataStore();
      data.filterByAuthor(author);
      expect(data.filter.type).toBe("author");
      expect(
        data.filteredData?.every((entry) => entry.author === author)
      ).toBeTruthy();
    });

    it(`should belong to ${author} and be of type 'image'`, () => {
      const data = useDataStore();
      data.filterByAuthor(author);
      data.filterByMediaType("image");
      expect(data.filter.bibliographic.author.includes(author)).toBeTruthy();
      expect(
        data.filteredData?.every(
          (entry) => entry.author === author && entry.metadata.type === "image"
        )
      ).toBeTruthy();
    });
  }

  for (const mediaType of ["audio"]) {
    it(`should be of type ${mediaType}`, () => {
      const data = useDataStore();
      data.filterByMediaType(mediaType as mediaType);
      expect(
        data.filteredData?.every((entry) => entry.media === mediaType)
      ).toBeTruthy();
    });
  }

  for (const title of ["So eine Freiheit"]) {
    it(`should have a title which matches ${title}`, () => {
      const data = useDataStore();
      data.filterByTitleOrId(title);
      expect(
        data.filteredData?.every(
          (entry) =>
            entry.biblio.title.includes(title) ||
            entry.biblio.context.includes(title)
        )
      ).toBeTruthy();
    });
  }
});
