import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../style';

const title = ({ title }) => (
  <Text style={styles.title}>| {title}</Text>
);

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    color: COLORS.primaryGreen,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  }
});

export default title;