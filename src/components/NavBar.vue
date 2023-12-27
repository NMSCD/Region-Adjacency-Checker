<script setup lang="ts">
import { watch, ref } from 'vue';
import { useI18n } from '../hooks/useI18n';
import ThemeSwitch from './ThemeSwitch.vue';

const { t, locale } = useI18n();

type Locales = typeof locale.value;

const selectedLocale = ref<Locales>(locale.value);

watch(selectedLocale, (newVal) => {
  locale.value = newVal;
  localStorage.setItem('lang', newVal);
});
</script>

<template>
  <nav>
    <ul>
      <li>
        <a
          :title="t('translation.viewother')"
          href=".."
          >← {{ t('translation.viewother') }}</a
        >
      </li>
    </ul>
    <ul>
      <li>
        <select v-model="selectedLocale">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      </li>
      <li>
        <ThemeSwitch />
      </li>
    </ul>
  </nav>
</template>
