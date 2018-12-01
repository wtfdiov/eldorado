import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import { roundToken } from '../../../helpers/roundToken';

const config = {
    symbol: 'NBR',
    name: 'Nióbio Cash',
    decimals: 8,
    defaultUnit: 100000000
}

const parseValue = (value, isFixed) => {
  if (isNaN(value)) {
    return 'N/A'
  } else {
    const v = (value / config.defaultUnit)
    if (isFixed) {
      return v.toFixed(config.decimals).toString()
    } else {
      return v.toFixed(roundToken(v)).toString()
    }
  }
}

const nbr = (props) =>{
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{
        color: props.value > 0 ? 'green' : 'red'
      }}>
        {parseValue(props.value, props.isFixed)}
      </Text>
      {props.transaction && <Fragment><Text> </Text><Icon name={props.value > 0 ? 'ios-arrow-up' : 'ios-arrow-down'} size={16} color={props.value > 0 ? 'green' : 'red'} /></Fragment>}
    </View>
  )
}
  

export default nbr;