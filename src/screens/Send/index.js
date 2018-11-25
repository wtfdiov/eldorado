import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Picker, View } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import RadioGroup from 'react-native-radio-buttons-group';

import { connect } from 'react-redux';
import { fetchWallets, newTransaction } from '../../store/actions';

import { config } from '../../../app.json';

import shortifyAddress from '../../helpers/shortfyAddress';
class SendScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromAddress: '',
      toAddress: '',
      amount: 0,
      fee: 0.0001,
      paymentId: '',
      anonymity: [
        {
            label: '0',
        },
        {
            label: '1',
            selected: true
        },
        {
            label: '2',
        },
        {
            label: '3',
        },
        {
            label: '4',
        },
    ]
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
        anonymity: parseInt(this.state.anonymity.find(a => a.selected === true).value),
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
            <Picker.Item key={wallet.id} label={shortifyAddress(wallet.address)} value={wallet.address} />
          ))}
        </Picker>

        <Item regular style={{paddingLeft: 10}}>
          <Icon name="ios-wallet" size={21} />
          <Input placeholder='Destination' onChangeText={(toAddress) => this.setState({toAddress})} value={this.state.toAddress} spellCheck={false} />
        </Item>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20}}>
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

        <View style={{marginVertical: 20}}>
          <RadioGroup radioButtons={this.state.anonymity} onPress={anonymity => this.setState({ anonymity })} flexDirection="row" />
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