import React from 'react';
import { View } from 'react-native';

const card = (props) => (
  <View style={{
    width: '95%',
    marginTop: 10,
    padding: 10,
    backgroundColor: props.bgColor,
    borderColor: '#ced4da',
    borderWidth: 1,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 2}}S
  >
      {props.children}
  </View>
);

export default card;