import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Moment from 'react-moment';

import Card from '../common/Card';
import AddressBox from '../common/AddressBox';
import NBR from '../common/DisplayValue/NBR';

const transactionItem = (props) => (
  <TouchableOpacity onPress={() => props.onTouch(props.transaction.id)}>
    <Card bgColor="white">
      <AddressBox address={props.transaction.from} />
      <AddressBox address={props.transaction.to.address} />
      <NBR value={props.transaction.amount} />
      <Moment element={Text} parse="YYYY-MM-DD HH:mm" fromNow> {props.transaction.createdAt} </Moment>
      <Moment element={Text} parse="YYYY-MM-DD HH:mm" date={props.transaction.createdAt} />
    </Card>
  </TouchableOpacity>
);

export default transactionItem;