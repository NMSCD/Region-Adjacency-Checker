<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { useRegionDataStore } from './stores/regionData';
import { storeToRefs } from 'pinia';
import GlyphInput from './components/GlyphInput.vue';
import { ref, computed } from 'vue';
import { useRegionAdjacency } from './composables/useRegionAdjacency';
import { useI18n } from './hooks/useI18n';

const { t } = useI18n();

const regionDataStore = useRegionDataStore();
const { glyphValues } = storeToRefs(regionDataStore);

const adjacency = ref('');
const isAdjacent = ref(false);

function checkAdjacency() {
  const distance = useRegionAdjacency();
  if (distance === 1) {
    adjacency.value = t('translation.directlytouching');
  } else if (distance === Math.sqrt(2)) {
    adjacency.value = t('translation.touchingontheedge');
  } else if (distance === Math.sqrt(3)) {
    adjacency.value = t('translation.touchingonthecorner');
  } else {
    adjacency.value = t('translation.touchingonthecorner');
  }
  isAdjacent.value = distance === 1 || distance === Math.sqrt(2) || distance === Math.sqrt(3);
}

const glyphInputLabels = computed(() => [t('translation.enterfirstregion'), t('translation.entersecondregion')]);
</script>

<template>
  <header>
    <NavBar />
    <h1 class="title">{{ t('translation.title') }}</h1>
  </header>

  <main>
    <div class="input-wrapper">
      <GlyphInput
        v-for="i in 2"
        :index="i - 1"
        :label="glyphInputLabels[i - 1]"
        class="glyph-input"
      />
    </div>
    <button
      :disabled="!glyphValues.length || glyphValues.some((gl) => gl.length !== 12)"
      class="button"
      @click="checkAdjacency"
    >
      {{ t('translation.check') }}
    </button>
    <p
      v-show="adjacency"
      :class="{ 'is-success': isAdjacent, 'is-error': !isAdjacent }"
      class="output"
    >
      {{ adjacency }}
    </p>
  </main>
</template>

<style scoped lang="scss">
.title {
  margin-block-end: 2rem;
  text-align: center;
}

.input-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-evenly;
}

.button {
  width: auto;
  margin-inline: auto;
  margin-block-start: 2rem;
}

.output {
  text-align: center;
  padding: 1rem;
  border-radius: var(--border-radius);
}

.is-success {
  background-color: green;
}

.is-error {
  background-color: red;
}
</style>
