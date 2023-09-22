<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { useRegionDataStore } from './stores/regionData';
import { storeToRefs } from 'pinia';
import GlyphInput from './components/GlyphInput.vue';
import { ref } from 'vue';
import { useRegionAdjacency } from './composables/useRegionAdjacency';

const regionDataStore = useRegionDataStore();
const { glyphValues } = storeToRefs(regionDataStore);

const adjacency = ref('');
const isAdjacent = ref(false);

function checkAdjacency() {
  const distance = useRegionAdjacency();
  if (distance === 1) {
    adjacency.value = 'Directly touching';
  } else if (distance === Math.sqrt(2)) {
    adjacency.value = 'Touching on one edge';
  } else if (distance === Math.sqrt(3)) {
    adjacency.value = 'Touching on one corner';
  } else {
    adjacency.value = 'Not touching';
  }
  isAdjacent.value = distance === 1 || distance === Math.sqrt(2) || distance === Math.sqrt(3);
}
</script>

<template>
  <header>
    <NavBar />
    <h1 class="title">Region Adjacency Checker</h1>
  </header>

  <main>
    <div class="input-wrapper">
      <GlyphInput
        :index="0"
        class="glyph-input"
        label="Enter First Region Glyphs/Coordinates"
      />

      <GlyphInput
        :index="1"
        class="glyph-input"
        label="Enter Second Region Glyphs/Coordinates"
      />
    </div>
    <button
      :disabled="!glyphValues.length || glyphValues.some((gl) => gl.length !== 12)"
      class="button"
      @click="checkAdjacency"
    >
      Check Adjacency
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
