<script setup lang="ts">
import { useI18n } from '../hooks/useI18n';

const { t } = useI18n();
// determine preferred theme and update the html element with the respective tag
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
switchTheme(prefersDark ? 'dark' : 'light');

function switchTheme(theme: string | undefined = undefined) {
  const currentTheme = document.documentElement.dataset.theme;
  const computedNewTheme = currentTheme == 'dark' ? 'light' : 'dark';
  const newTheme = theme ?? computedNewTheme;
  document.documentElement.dataset.theme = newTheme;
}
</script>

<template>
  <button
    class="themeswitcher"
    id="themeSwitch"
    role="button"
    @click="switchTheme()"
  >
    {{ t('translation.switchtheme') }}
  </button>
</template>
