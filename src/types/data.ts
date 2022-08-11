interface bib {
  title: string;
  subtitle?: string;
  type: 'pre-text' | 'text' | 'epi-text';
  year: Date | undefined;
  broadcaster?: string;
}

interface archive {
  place: string;
  institution: string;
}

type mediaType = 'audio' | 'image';

interface meta {
  type: mediaType;
  file: string | undefined;
}

interface entry {
  id: string;
  author: string;
  media: 'print' | 'manuscript' | 'audio';
  biblio: bib;
  archival: archive;
  metadata: meta;
  description: string;
}

export type { entry, mediaType };
