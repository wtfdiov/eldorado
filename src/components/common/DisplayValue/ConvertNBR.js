import React, { useState, useEffect, useCallback } from 'react';
import { Text } from 'react-native';
import axios from 'axios';

import { config } from '../../../../app.json';
import { roundToken } from '../../../helpers/roundToken';

function ConvertNBR({ to, amount, decimals }) {
  useEffect(() => {
    convert(config.symbol, to, amount / config.defaultUnit);
  }, [amount]);

  const convert = useCallback(async (from, to, amount) => {
    try {
      const response = await axios.post(`${config.api}/conversions`, {
        ticker: {
          from,
          to
        },
        amount
      });
      const value = response.data.price.toFixed(decimals || roundToken(response.data.price));
      setValue(value);
    } catch (e) {
      console.log(`Problem trying to convert ${from} to ${to}.`, error);
    }
  });

  const [value, setValue] = useState(0);

  return <Text> {value} </Text>;
}

export default ConvertNBR;
