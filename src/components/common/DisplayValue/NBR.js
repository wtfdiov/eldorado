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
  txtColor = {color: props.color} || {};
  txtSize = {fontSize: props.size} || {};
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
      {props.transaction && <Fragment><Icon name={props.value > 0 ? 'ios-arrow-up' : 'ios-arrow-down'} size={16} color={props.value > 0 ? '#3E863D' : '#dc3545'} /><Text> </Text></Fragment>}
      {props.transaction
      ? (
        <Text style={{
          color: props.value > 0 ? '#3E863D' : '#dc3545'
        }}>
          {parseValue(props.value, props.isFixed)} {props.symbol && <Text style={{fontWeight: 'bold'}}>NBR</Text>}
        </Text>
      )
      : (
        <Text style={[txtColor, txtSize]}>
          {parseValue(props.value, props.isFixed)} {props.symbol && <Text style={{fontWeight: 'bold'}}>NBR</Text>}
        </Text>
      )}
    </View>
  )
}
  

export default nbr;