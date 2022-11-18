interface addtional {
  length?: string;
  producer?: string;
  cast?: string[];
}

interface bib {
  title: string;
  subtitle?: string;
  description?: string;
  type: 'letter' | 'note' | 'draft' | 'tape';
  year?: string;
  dateBroadcast?: string;
  radiostation?: string;
  broadcaster?: string;
  context: string;
  addtional?: addtional;
}

interface archive {
  instution: string;
  format?: string;
  scope?: string;
  description?: string;
  id?: string;
}

type mediaType = 'audio' | 'image';

interface meta {
  type: mediaType;
  files: string[] | undefined;
  selectedFile: string;
}

interface entry {
  showcase: string | null;
  id: string;
  author: string;
  media: 'print' | 'manuscript' | 'audio';
  biblio: bib;
  archival: archive;
  metadata: meta;
}

export type { entry, mediaType };
