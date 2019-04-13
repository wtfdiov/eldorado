import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import br from '../../assets/br.png';
import us from '../../assets/us.png';

const chooseLanguage = () => (
  <View style={styles.container}>
    <TouchableOpacity>
      <Image style={styles.flags} source={br} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image style={styles.flags} source={us} />
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