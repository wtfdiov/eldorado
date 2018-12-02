import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Picker, View, Slider } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { fetchWallets, newTransaction } from '../../store/actions';

import { config } from '../../../app.json';

import shortifyAddress from '../../helpers/shortfyAddress';
import BlocksInfo from '../../components/common/BlocksInfo';
import formatNBR from '../../helpers/formatNBR';
class SendScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromAddress: '',
      toAddress: '',
      amount: 0,
      fee: 0.0001,
      paymentId: '',
      anonymity: 1
    }
    this.initialState = this.state 
  }

  componentDidMount() {
    this.props.fetchWallets();
  }

  componentDidUpdate() {
    if (!this.state.fromAddress && this.props.wallets.length) {
      this.setState({fromAddress: this.props.wallets[0].address})
    }
  }

  validateForm() {
    return (
      !this.state.fromAddress
      || !this.state.toAddress
      || !this.state.amount
      || !this.state.fee
    )
  }

  createTransaction() {
    const transaction = {
      changeAddress: this.state.fromAddress.toString(),
      from: this.state.fromAddress.toString(),
      fee: parseFloat(this.state.fee * config.defaultUnit),
      to: {
        address: this.state.toAddress.toString(),
        amount: parseFloat(this.state.amount * config.defaultUnit),
      },
      extra: {
        anonymity: this.state.anonymity,
        paymentId: this.state.paymentId
      }
    }
    this.props.newTransaction(transaction);
    this.resetForm();
  }

  resetForm() {
    this.setState(this.initialState)
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text> Select the wallet to get the NBR from </Text>
        <Picker
          selectedValue={this.state.fromAddress}
          style={{ height: 50, width: '100%' }}
          onValueChange={(fromAddress) => this.setState({fromAddress})}
        >
          {this.props.wallets && this.props.wallets.map(wallet => (
            <Picker.Item key={wallet.id} label={`${shortifyAddress(wallet.address, 10)} (${formatNBR(wallet.balance.available)})`} value={wallet.address} />
          ))}
        </Picker>

        <Item regular style={{paddingLeft: 10}}>
          <Icon name="ios-wallet" size={21} />
          <Input placeholder='Destination' onChangeText={(toAddress) => this.setState({toAddress})} value={this.state.toAddress} spellCheck={false} />
        </Item>

        {this.state.fromAddress
        ?  (
          <BlocksInfo
            available={this.props.wallets.find(
                wallet => wallet.address === this.state.fromAddress
              ).balance.available}
            locked={this.props.wallets.find(
                wallet => wallet.address === this.state.fromAddress
              ).balance.locked}
          />
        )
        : null}

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
          <View style={{flex: 2, paddingRigth: 10}}>
            <Item regular>
              <Label style={{backgroundColor: '#e6fbe6', color: '#acdcac', height: '100%', paddingTop: 10, paddingHorizontal: 5}}>Amount</Label>
              <Input onChangeText={(amount) => this.setState({amount})} value={this.state.amount.toString()} keyboardType="number-pad" />
            </Item>
          </View>
        
          <View style={{flex: 2, paddingLeft: 10}}>
            <Item regular>
              <Label style={{backgroundColor: '#e6fbe6', color: '#acdcac', height: '100%', paddingTop: 10, paddingHorizontal: 5}}>Fee</Label>
              <Input onChangeText={(fee) => this.setState({fee})} value={this.state.fee.toString()} keyboardType="number-pad" />
            </Item>
          </View>
        </View>

        <Item regular style={{paddingLeft: 10}}>
          <Icon name="ios-pricetag" size={21} />
          <Input placeholder='PaymentId' onChangeText={(paymentId) => this.setState({paymentId})} value={this.state.paymentId} />
        </Item>

        <View style={{flexDirection: 'row', marginVertical: 30}}>
          <Text>Anonymity</Text>
          <Slider
            minimumValue={0}
            maximumValue={6}
            step={1}
            onSlidingComplete={anonymity => this.setState({ anonymity })}
            value={this.state.anonymity}
            style={{
              flex: 1
            }}
            thumbTintColor="#60b145"
          />
          <Text>{this.state.anonymity}</Text>
        </View>

        <Button success block disabled={this.validateForm()} onPress={() => this.createTransaction()}><Text> SEND </Text></Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  }
});

const mapStateToProps = state => {
  return {
    wallets: state.wallets.wallets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWallets: () => dispatch(fetchWallets()),
    newTransaction: (transaction) => dispatch(newTransaction(transaction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendScreen);