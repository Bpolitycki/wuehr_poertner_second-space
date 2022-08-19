interface bib {
  title: string;
  subtitle?: string;
  type: "pre-text" | "text" | "epi-text";
  year?: Date | undefined;
  broadcaster?: string;
  context: string;
}

interface archive {
  place: string;
  institution: string;
}

type mediaType = "audio" | "image";

interface meta {
  type: mediaType;
  files: string[] | undefined;
  selectedFile: string;
}

interface entry {
  id: string;
  author: string;
  media: "print" | "manuscript" | "audio";
  biblio: bib;
  archival: archive;
  metadata: meta;
  description: string;
}

export type { entry, mediaType };
