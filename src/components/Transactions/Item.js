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
        <Text style={[componentStyle.label, componentStyle.strong, {fontSize: 14}]}>{shortifyAddress(props.transaction.from, 6)}</Text>
        <Icon name="ios-arrow-round-forward" size={32} />
        <Text style={[componentStyle.label, componentStyle.strong, {fontSize: 14}]}>{shortifyAddress(props.transaction.to.address, 6)}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="ios-cash" size={21} color={props.transaction.amount > 0 ? 'green' : 'red'}/>
        <Text> </Text>
        <NBR transaction value={props.transaction.amount} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="ios-calendar" size={21} />
        <Text> </Text>
        <Moment element={Text} format="D MMM YYYY HH:mm">{props.transaction.createdAt}</Moment>
      </View>
      </View>
    </GridItem>
  </TouchableOpacity>
);

export default transactionItem;