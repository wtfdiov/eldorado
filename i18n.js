import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';

import ptBR from './translations/pt-BR.json';
import en from './translations/en.json';

export default async () => {
  let languageTag = await AsyncStorage.getItem('eldorado.language');

  i18n.defaultLocale = 'pt-BR';
  i18n.fallbacks = true;

  i18n.translations = {
    'pt-BR': ptBR,
    en
  };

  if (languageTag) {
    i18n.locale = languageTag;
  }
};
