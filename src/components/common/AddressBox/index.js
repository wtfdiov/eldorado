import React from 'react';
import { View, Text } from 'react-native';

import shortifyAddress from '../../../helpers/shortfyAddress';

const addressBox = (props) => (
  <View>
    <Text>
      {shortifyAddress(props.address)}
    </Text>
  </View>
);

export default addressBox;