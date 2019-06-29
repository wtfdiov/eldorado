import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import i18n from 'i18n-js';
import RNRestart from 'react-native-restart';

import br from '../../assets/br.png';
import us from '../../assets/us.png';
const changeLanguage = async language => {
  await AsyncStorage.setItem('eldorado.language', language);
  i18n.locale = language;
  RNRestart.Restart();
};

const chooseLanguage = () => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => changeLanguage('pt-BR')}
      disabled={i18n.locale === 'pt-BR'}
    >
      <Image
        style={[
          styles.flags,
          { opacity: i18n.locale === 'pt-BR' ? 0.99 : 0.3 }
        ]}
        source={br}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => changeLanguage('en-US')}
      disabled={i18n.locale === 'en-US'}
    >
      <Image
        style={[
          styles.flags,
          { opacity: i18n.locale === 'en-US' ? 0.99 : 0.3 }
        ]}
        source={us}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flags: {
    height: 48,
    width: 48
  }
});

export default chooseLanguage;
