import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import RNRestart from 'react-native-restart';

import br from '../../assets/br.png';
import us from '../../assets/us.png';

function ChooseLanguage() {
  const changeLanguage = useCallback(async language => {
    await AsyncStorage.setItem('eldorado.language', language);
    RNRestart.Restart();
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => changeLanguage('pt-BR')} disabled={i18n.locale === 'pt-BR'}>
        <Image style={[styles.flags, { opacity: i18n.locale === 'pt-BR' ? 0.99 : 0.3 }]} source={br} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLanguage('en')} disabled={i18n.locale === 'en'}>
        <Image style={[styles.flags, { opacity: i18n.locale === 'en' ? 0.99 : 0.3 }]} source={us} />
      </TouchableOpacity>
    </View>
  );
}

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

export default ChooseLanguage;
