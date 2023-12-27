<script setup lang="ts">
import { useRegionDataStore } from '../stores/regionData';
import { storeToRefs } from 'pinia';
import { useI18n } from '../hooks/useI18n';

const { t } = useI18n();

const props = defineProps<{
  label: string;
  index: number;
}>();

const validInputRegex = /[0-9A-F:]/;

const regionDataStore = useRegionDataStore();
const { glyphs, glyphValues } = storeToRefs(regionDataStore);

function addGlyph(e: Event) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  glyphs.value[props.index] ??= '';
  if (glyphs.value[props.index]?.length < 12) {
    glyphs.value[props.index] += e.target.value; // NoSonar 12 is maximum glyph length
  }
}

function deleteGlyph() {
  glyphs.value[props.index] = glyphs.value[props.index].slice(0, -1);
}

function lintGlyphs() {
  glyphs.value[props.index] = glyphs.value[props.index]
    .toUpperCase()
    .split('')
    .filter((char) => validInputRegex.test(char))
    .join('');
}

const numberToGlyph = (n: number) => n.toString(16).toUpperCase(); // NoSonar this is dec to hex
</script>

<template>
  <div>
    <label
      class="required"
      for="portalglyphsInput"
      >{{ label }}:</label
    >
    <div class="glyph-input-wrapper">
      <input
        class="glyphs-input"
        id="portalglyphsInput"
        maxlength="19"
        type="text"
        v-model="glyphs[index]"
        @input="lintGlyphs"
      />
      <button
        class="delete-button is-error"
        id="delButton"
        role="button"
        type="button"
        @click="deleteGlyph"
      >
        &larr; {{ t('translation.delete') }}
      </button>
    </div>
    <div class="portal-buttons grid">
      <button
        v-for="n in 16"
        :id="'glyphButton' + n"
        :value="numberToGlyph(n - 1)"
        class="button glyphs"
        type="button"
        @click="addGlyph"
      >
        {{ numberToGlyph(n - 1) }}
      </button>
    </div>
    <p
      v-show="glyphValues[index] && !glyphValues[index].includes(':')"
      class="glyph-display-wrapper"
    >
      <output
        class="glyphs"
        id="glyphDisplay"
        >{{ glyphValues[index] }}</output
      >
    </p>
  </div>
</template>

<style scoped lang="scss">
.glyphs {
  font-family: NMS-Glyphs-Mono;
  font-size: 3rem;
  word-break: break-word;
}

.glyph-display-wrapper {
  margin-bottom: 0 !important;
}

.portal-buttons {
  display: grid;
  grid-template-columns: repeat(8, auto);
  max-width: 800px;

  .button {
    line-height: 3rem;
    padding: 0;
  }
}

@media only screen and (max-width: 767px) {
  .portal-buttons {
    display: flex;
    flex-wrap: wrap;

    .button {
      width: 4rem;
    }
  }
}

.glyph-input-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;

  .delete-button {
    margin-inline-start: 0.5rem;
    width: auto;
  }

  .glyphs-input {
    flex-grow: 1;
    width: auto;
  }
}

.is-error {
  background-color: indianred;
  border: 1px solid firebrick;
}
</style>
