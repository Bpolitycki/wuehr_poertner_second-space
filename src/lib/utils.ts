import type { entry } from '@/types/data';

const imageUrl = (item: entry) => {
  return item.metadata.type == 'image'
    ? new URL(
        `../assets/data/images/${item.metadata.selectedFile}`,
        import.meta.url
      ).href
    : undefined;
};

export { imageUrl };
