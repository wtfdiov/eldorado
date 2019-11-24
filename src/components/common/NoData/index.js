import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const noData = ({ children, message }) => (
  <View style={styles.container}>
    {children}
    <Headline>{message}</Headline>
  </View>
);

export default noData;
