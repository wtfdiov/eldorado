import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import i18n from 'i18n-js';
import configureLanguage from './i18n';

import SplashScreen from './src/navigation/SplashScreen';

import { COLORS } from './src/components/style';
import { StatusBar } from 'react-native';

enableScreens();
const store = configureStore();

export const LocalizationContext = React.createContext();

function App() {
  React.useEffect(() => {
    async function cfgLanguage() {
      await configureLanguage();
      setLocale(i18n.locale);
    }
    cfgLanguage();
  }, []);
  const [locale, setLocale] = React.useState(i18n.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale
    }),
    [locale]
  );

  return (
    <>
      <StatusBar backgroundColor={COLORS.secondaryGreen} />
      <Provider store={store}>
        <LocalizationContext.Provider value={localizationContext}>
          <NavigationNativeContainer>
            <SplashScreen />
          </NavigationNativeContainer>
        </LocalizationContext.Provider>
      </Provider>
    </>
  );
}

export default App;
