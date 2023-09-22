import { useRegionDataStore } from '../stores/regionData';
import { storeToRefs } from 'pinia';

const extractX = (glyphs: string) => glyphs.slice(-3);
const extractY = (glyphs: string) => glyphs.slice(-6, -3);
const extractZ = (glyphs: string) => glyphs.slice(4, 6);

export function useRegionAdjacency() {
  const regionDataStore = useRegionDataStore();
  const { glyphValues } = storeToRefs(regionDataStore);

  const x1 = parseInt(extractX(glyphValues.value[0]), 16);
  const y1 = parseInt(extractY(glyphValues.value[0]), 16);
  const z1 = parseInt(extractZ(glyphValues.value[0]), 16);

  const x2 = parseInt(extractX(glyphValues.value[1]), 16);
  const y2 = parseInt(extractY(glyphValues.value[1]), 16);
  const z2 = parseInt(extractZ(glyphValues.value[1]), 16);

  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const dz = Math.abs(z2 - z1);

  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  return distance;
}
