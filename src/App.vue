<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { useRegionDataStore } from './stores/regionData';
import { storeToRefs } from 'pinia';
import GlyphInput from './components/GlyphInput.vue';
import { ref, computed, watch } from 'vue';
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
    adjacency.value = t('translation.nottouching');
  }
  isAdjacent.value = distance === 1 || distance === Math.sqrt(2) || distance === Math.sqrt(3);
}

const glyphInputLabels = computed(() => [t('translation.enterfirstregion'), t('translation.entersecondregion')]);

watch(
  () => glyphValues.value,
  (newValues) => {
    if (!newValues.length || newValues.length < 2 || newValues.some((gl) => gl.length !== 12)) {
      adjacency.value = '';
      isAdjacent.value = false;
    }
  },
  { deep: true }
);

const checkIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
`;

const errorIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
`;
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
        :key="i"
        :index="i - 1"
        :label="glyphInputLabels[i - 1]"
        class="glyph-input"
      />
    </div>
    <div class="action-button-wrapper">
      <button
        :disabled="!glyphValues.length || glyphValues.some((gl) => gl.length !== 12)"
        class="button"
        @click="checkAdjacency"
      >
        {{ t('translation.check') }}
      </button>
    </div>
    <transition name="fade">
      <div
        v-if="adjacency"
        :class="['output', isAdjacent ? 'is-success' : 'is-error']"
      >
        <span
          class="icon"
          aria-hidden="true"
          v-html="isAdjacent ? checkIcon : errorIcon"
        />
        <span class="message">{{ adjacency }}</span>
      </div>
    </transition>
  </main>
</template>

<style scoped>
.title {
  margin-block-end: 2rem;
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
}

.input-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.action-button-wrapper {
  margin-block-start: 2rem;
  margin-block-end: 1rem;
  text-align: center;
}

.button {
  background-color: #2c7a7b;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease,
    transform 0.15s ease;
  opacity: 1;
}

.button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.button:not(:disabled):hover {
  background-color: #285e61;
}

.output {
  max-width: 400px;
  margin: 1.5rem auto;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  user-select: none;
  transition:
    background-color 0.4s ease,
    box-shadow 0.4s ease;
}

.icon {
  display: flex;
  align-items: center;
}

.is-success {
  background-color: #38a169; /* verde pastel */
  box-shadow: 0 6px 12px rgb(56 161 105 / 0.4);
}

.is-error {
  background-color: #e53e3e; /* rojo pastel */
  box-shadow: 0 6px 12px rgb(229 62 62 / 0.4);
}

.message {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
