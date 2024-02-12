import { createI18n } from 'vue-i18n';
import Español from './es-ES';
import English from './en-EN';
import Euskara from './eu-EU';
import Deutsch from './de-DE';

const messages = {
  Español,
  English,
  Euskara,
  Deutsch,
};

const languageMap = {
  Español: ['es', 'es-ES'],
  English: ['en', 'en-EN', 'en-GB', 'en-US'],
  Euskara: ['eu', 'eu-EU'],
  Deutsch: ['de', 'de-DE'],
};

const langEntries = Object.entries(languageMap);
const preferredUserLang = navigator.language;

const userLang =
  langEntries.find((lang) => lang[1].some((langCode) => langCode === preferredUserLang))?.[0] ?? 'English';

const localStorageLang = localStorage.getItem('lang');
const preferredLang = localStorageLang ?? userLang;

const i18n = createI18n({
  locale: preferredLang,
  legacy: false,
  messages,
});

export { i18n, messages };
