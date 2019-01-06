import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import ptBR from './translations/pt-BR.json';
import enUS from './translations/en-US.json'

i18n.defaultLocale = 'pt-BR';
i18n.locale = RNLanguages.language;
i18n.fallbacks = 'pt-BR';
i18n.translations = {
  'pt-BR': ptBR,
  'en-US': enUS
};

export default i18n;
