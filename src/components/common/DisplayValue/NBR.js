import React from 'react';
import { Text } from 'react-native';

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

const nbr = (props) => <Text> {parseValue(props.value, props.isFixed)} </Text>;

export default nbr;