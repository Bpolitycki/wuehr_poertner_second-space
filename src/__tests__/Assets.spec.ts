import { describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDataStore } from '@/stores/data';
import { existsSync } from 'fs';
import { join } from 'path';

setActivePinia(createPinia());

const allAssets = useDataStore()
  .data.map((entry) => entry.metadata.files)
  .flat();

describe('The asset: ', () => {
  for (const asset of allAssets) {
    const root = asset?.endsWith('.mp3')
      ? '../assets/data/audio/'
      : '../assets/data/images/';
    it(`${asset} should be located inside the following directory: ${root}`, () => {
      expect(existsSync(join(__dirname, `${root}${asset}`))).toBeTruthy();
    });
  }
});
