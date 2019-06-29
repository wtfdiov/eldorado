import { AsyncStorage } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import ptBR from './translations/pt-BR.json';
import enUS from './translations/en-US.json';

export default async () => {
  let languageTag = await AsyncStorage.getItem('eldorado.language');

  i18n.translations = {
    'pt-BR': ptBR,
    'en-US': enUS
  };

  i18n.defaultLocale = 'pt-BR';
  i18n.fallbacks = false;

  const fallback = { languageTag: 'pt-BR', isRTL: false };

  if (!languageTag) {
    const bestAvailable = await RNLocalize.findBestAvailableLanguage(
      Object.keys(i18n.translations)
    );
    languageTag = bestAvailable.languageTag || fallback;
  }

  i18n.locale = languageTag;
};
