import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Moment from 'react-moment';

import Icon from 'react-native-vector-icons/Ionicons'

import shortifyAddress from '../../helpers/shortfyAddress';
import Card from '../common/Card';
import AddressBox from '../common/AddressBox';
import NBR from '../common/DisplayValue/NBR';

import componentStyle from '../style';
import GridItem from '../common/TGridItem';

const transactionItem = (props) => (
  <TouchableOpacity onPress={() => props.onTouch(props.transaction.id)} style={{alignSelf: 'center', flexDirection: 'row', flex: 1}}>
    <GridItem bgColor="white">
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 5}}>
        <AddressBox address={props.transaction.from} />
        <Icon name="ios-arrow-round-forward" size={32} />
        <AddressBox address={props.transaction.to.address} />
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <Icon name={props.transaction.status === 2 ? 'ios-checkmark-circle': 'ios-time'} color={props.transaction.status === 2 ?  '#3E863D' : '#F49917'} size={18} />

        <NBR transaction symbol value={props.transaction.amount} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="ios-calendar" size={18} />
          <Text> </Text>
          <Moment element={Text} format="D MMM YYYY HH:mm">{props.transaction.createdAt}</Moment>
        </View>
      </View>
    </GridItem>
  </TouchableOpacity>
);

export default transactionItem;