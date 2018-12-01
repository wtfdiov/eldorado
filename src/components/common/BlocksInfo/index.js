import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NBR from '../DisplayValue/NBR';

const blocksInfo = ({ available, locked }) => (
  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="md-cash" color="#3E863D" size={18} />
      <Text> </Text>
      <NBR value={available} color="#3E863D" size={18} />
    </View>
    <Text> </Text>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="ios-lock" color="#dc3545" size={18} />
      <Text> </Text>
      <NBR value={locked} color="#dc3545" size={18} />
    </View>
  </View>
);

export default blocksInfo;