import React from 'react';
import { View, Text } from 'react-native';

const addressBox = (props) => (
  <View>
    <Text>
      {props.address
        ? `${props.address.substring(0, 15)}...${props.address.substring(props.address.length - 15, props.address.length)}`
        : 'Anonymous'
      }
    </Text>
  </View>
);

export default addressBox;