import React from 'react';
import { View, Text } from 'react-native';
import Moment from 'react-moment';
import { Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import AddressBox from '../common/AddressBox';
import NBR from '../common/DisplayValue/NBR';

function TransactionItem({ transaction, onTouch }) {
  const {
    id,
    from,
    to: { address },
    status,
    amount,
    createdAt
  } = transaction;
  return (
    <Card
      style={{
        flex: 1,
        marginHorizontal: 12,
        marginVertical: 6,
        paddingVertical: 12
      }}
      onPress={() => onTouch(id)}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginVertical: 5
        }}
      >
        <AddressBox address={from} />
        <Icon name="ios-arrow-round-forward" size={32} />
        <AddressBox address={address} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        <Icon
          name={status === 2 ? 'ios-checkmark-circle' : 'ios-time'}
          color={status === 2 ? '#3E863D' : '#F49917'}
          size={18}
        />

        <NBR transaction symbol value={amount} />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="ios-calendar" size={18} />
          <Text> </Text>
          <Moment element={Text} format="D MMM YYYY HH:mm">
            {createdAt}
          </Moment>
        </View>
      </View>
    </Card>
  );
}

export default TransactionItem;
