import type { entry } from "@/types/data";

const imageUrl = (item: entry) => {
  return item.metadata.type == "image"
    ? new URL(
        `../assets/data/images/${item.metadata.selectedFile}`,
        import.meta.url
      ).href
    : undefined;
};

const secToMin = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export { imageUrl, secToMin };
