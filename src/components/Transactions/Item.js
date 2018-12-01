import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Moment from 'react-moment';

import Card from '../common/Card';
import AddressBox from '../common/AddressBox';
import NBR from '../common/DisplayValue/NBR';

import componentStyle from '../style';
import GridItem from '../common/TGridItem';

const transactionItem = (props) => (
  <TouchableOpacity onPress={() => props.onTouch(props.transaction.id)} style={{alignSelf: 'center', flexDirection: 'row', flex: 1}}>
    <GridItem bgColor="white">
      <AddressBox address={props.transaction.from} style={[componentStyle.label, componentStyle.strong, componentStyle.smallText]}/>
      <AddressBox address={props.transaction.to.address} />
      <NBR value={props.transaction.amount} />
      <Moment element={Text} parse="YYYY-MM-DD HH:mm" fromNow> {props.transaction.createdAt} </Moment>
      <Moment element={Text} parse="YYYY-MM-DD HH:mm" date={props.transaction.createdAt} />
    </GridItem>
  </TouchableOpacity>
);

export default transactionItem;