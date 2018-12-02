import React from 'react';
import { View, Text } from 'react-native';

import shortifyAddress from '../../../helpers/shortfyAddress';

import componentStyle from '../../style';

const addressBox = ({ address, truncate = 6 }) => (
  <View>
    <Text style={[componentStyle.label, componentStyle.strong, {fontSize: 14}]}>
      {shortifyAddress(address, truncate)}
    </Text>
  </View>
);

export default addressBox;