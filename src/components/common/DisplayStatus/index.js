import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const displayStatus = ({ status }) => (
  <View style={{flexDirection: 'row'}}>
    <Icon name={status === 2 ? 'ios-checkmark-circle': 'ios-time'} color={status === 2 ?  '#3E863D' : '#F49917'} size={18} />
    <Text style={{color: status === 2 ?  '#3E863D' : '#F49917'}}> {status === 2 ? 'Confirmed' : 'Waiting'}</Text>
  </View>
);

export default displayStatus;