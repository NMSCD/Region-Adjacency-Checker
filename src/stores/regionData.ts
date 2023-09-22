import { defineStore } from 'pinia';
import { useCoordConversion } from '../composables/useCoordConversion';

interface State {
  glyphs: string[];
}

export const useRegionDataStore = defineStore('regionData', {
  state: (): State => ({
    glyphs: [],
  }),
  getters: {
    glyphValues: (state) => state.glyphs.map((item) => useCoordConversion(item)),
  },
});
