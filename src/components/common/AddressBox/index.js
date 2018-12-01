import React from 'react';
import { View, Text } from 'react-native';

import shortifyAddress from '../../../helpers/shortfyAddress';

import componentStyle from '../../style';

const addressBox = ({ address, cNum = 6 }) => (
  <View>
    <Text style={[componentStyle.label, componentStyle.strong, {fontSize: 14}]}>
      {shortifyAddress(address, cNum)}
    </Text>
  </View>
);

export default addressBox;