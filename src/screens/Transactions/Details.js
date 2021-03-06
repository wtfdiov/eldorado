import React, { useState } from 'react';
import { Linking, View, Text } from 'react-native';
import i18n from 'i18n-js';

import { config } from '../../../app.json';
import formatNBR from '../../helpers/formatNBR';
import { stringFromHex } from '../../helpers/hexTool';

import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Content, Card, CardItem } from 'native-base';
import Moment from 'react-moment';
import Pills from '../../components/common/TPills';
import AddressBox from '../../components/common/AddressBox';
import NBR from '../../components/common/DisplayValue/NBR';
import ConvertNBR from '../../components/common/DisplayValue/ConvertNBR';
import DisplayStatus from '../../components/common/DisplayStatus';

function Details({ transactions, transactionId }) {
  const [transaction] = useState(transactions.find(item => item.id === transactionId));

  const { from, to, extra, transactionHash, amount, status, fee, createdAt } = transaction;

  return (
    <Container>
      <Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20
          }}
        >
          <Pills
            icon={transaction.status === 2 ? 'ios-checkmark-circle' : 'ios-clock'}
            text={transaction.status === 2 ? i18n.t('common.confirmed') : i18n.t('common.waitingConfirmation')}
          />
          <Pills icon="ios-cash" text={`${formatNBR(amount)}`} />
          <Pills icon="md-trending-down" text={`${formatNBR(fee)}`} />
        </View>

        <Card>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.from')}</Text>
            <AddressBox address={from} truncate={14} />
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.to')}</Text>
            <AddressBox address={to.address} truncate={14} />
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.paymentId')}</Text>
            <Text>{extra.paymentId ? stringFromHex(extra.paymentId) : 'N/A'}</Text>
          </CardItem>
          <CardItem
            bordered
            button
            onPress={() => Linking.openURL(config.explorerHash.replace('@{hash}', transactionHash))}
            style={{ justifyContent: 'space-between' }}
          >
            <Text>{i18n.t('common.hash')}</Text>
            <View style={{ flexDirection: 'row' }}>
              <AddressBox address={transactionHash} truncate={14} />
              <Text> </Text>
              <Icon name="ios-search" size={14} color="#006e6e" style={{ marginTop: 3 }} />
            </View>
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.amount')}</Text>
            <NBR value={amount} transaction symbol />
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.fee')}</Text>
            <NBR value={fee} />
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.anonymity')}</Text>
            <Text>{extra.anonymity ? extra.anonymity.toString() : '0'}</Text>
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.status')}</Text>
            <DisplayStatus status={status} />
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>{i18n.t('common.createdAt')}</Text>
            <Text style={{ fontSize: 12 }}>
              <Moment element={Text} format="LLLL">
                {createdAt}
              </Moment>
            </Text>
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-between' }}>
            <Text>BTC</Text>
            <ConvertNBR to="BTC" amount={amount} />
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

export default Details;
