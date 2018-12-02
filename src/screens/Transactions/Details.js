import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Linking, View, Text } from 'react-native';

import { config } from '../../../app.json';
import formatNBR from '../../helpers/formatNBR';

import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Content, Card, CardItem } from 'native-base';
import Moment from 'react-moment';
import Pills from '../../components/common/TPills';
import AddressBox from '../../components/common/AddressBox';
import NBR from '../../components/common/DisplayValue/NBR';
import ConvertNBR from '../../components/common/DisplayValue/ConvertNBR';
import DisplayStatus from '../../components/common/DisplayStatus'

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transaction: props.transactions.find(item => item.id === props.transactionId)
    }
  }

  render () {
    const {
      from,
      to,
      extra,
      transactionHash,
      amount,
      status,
      fee,
      createdAt
    } = this.state.transaction;
    return (
      <Container>
        <Content>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <Pills icon={this.state.transaction.status === 2 ? 'ios-checkmark-circle' : 'ios-clock'} text={this.state.transaction.status === 2 ? 'Confirmed' : 'Awaiting'} />
          <Pills icon="ios-cash" text={`${formatNBR(amount)}`} />
          <Pills icon="md-trending-down" text={`${formatNBR(fee)}`} />
        </View>

        <Card>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>From</Text><AddressBox address={from} truncate={14} />
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>To</Text><AddressBox address={to.address} truncate={14} />
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>PaymentId</Text><Text>{extra.paymentId ? extra.paymentId.toString() : 'N/A'}</Text>
            </CardItem>
            <CardItem bordered button onPress={() => Linking.openURL(config.explorerHash.replace('@{hash}', transactionHash))} style={{justifyContent: 'space-between'}}>
              <Text>Hash</Text><View style={{flexDirection: 'row'}}><AddressBox address={transactionHash} truncate={14} /><Text> </Text><Icon name="ios-search" size={14} color="#60b145" style={{marginTop: 3}} /></View>
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>Amount</Text><NBR value={amount} transaction symbol/>
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>Fee</Text><NBR value={fee} />
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>Anonymity</Text><Text>{extra.anonymity ? extra.anonymity.toString() : '0'}</Text>
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>Status</Text><DisplayStatus status={status} />
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>Created at</Text><Moment element={Text} format="LLLL">{createdAt}</Moment>
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>USD</Text><ConvertNBR to="USD" amount={amount} />
            </CardItem>
            <CardItem bordered style={{justifyContent: 'space-between'}}>
              <Text>BTC</Text><ConvertNBR to="BTC" amount={amount} />
            </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

const mapStateToProps = state => ({ transactions: state.transactions.transactions});

export default connect(mapStateToProps, null)(Details)