import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Picker, View, Slider } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import uuidv1 from 'uuid/v1';
import i18n from '../../../i18n';

import { connect } from 'react-redux';
import { newTransaction } from '../../store/actions';

import { config } from '../../../app.json';

import shortifyAddress from '../../helpers/shortfyAddress';
import { stringToHex } from '../../helpers/hexTool';
import formatNBR from '../../helpers/formatNBR';

import BlocksInfo from '../../components/common/BlocksInfo';

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
    this.setAddress = this.setAddress.bind(this)
  }

  componentDidUpdate() {
    if (!this.state.fromAddress && this.props.wallets.length) {
      this.setState({fromAddress: this.props.wallets[0].address})
    }
  }

  setAddress = (fromAddress) => {
    this.setState({fromAddress})
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
        paymentId: stringToHex(this.state.paymentId)
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
        <Text> {i18n.t('send.selectWalletLabel')} </Text>

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
          <Input placeholder={i18n.t('send.destinationInputLabel')} onChangeText={(toAddress) => this.setState({toAddress})} value={this.state.toAddress} spellCheck={false} />
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
        : <Text style={{ alignSelf: 'center', margin: 10 }}>{i18n.t('send.selectAnWallet')}</Text>}

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
          <View style={{flex: 2, paddingRigth: 10}}>
            <Item regular>
              <Input onChangeText={(amount) => this.setState({amount})} value={this.state.amount.toString()} keyboardType="number-pad" />
              <Label style={{backgroundColor: '#c6f2f2', fontSize: 12, color: '#65b4b4', height: '100%', textAlignVertical: 'center', paddingHorizontal: 5}}>{i18n.t('common.amount')}</Label>
            </Item>
          </View>
        
          <View style={{flex: 2, paddingLeft: 10}}>
            <Item regular>
              <Input onChangeText={(fee) => this.setState({fee})} value={this.state.fee.toString()} keyboardType="number-pad" />
              <Label style={{backgroundColor: '#c6f2f2', fontSize: 12, color: '#65b4b4', height: '100%', textAlignVertical: 'center', alignContent: 'center', paddingHorizontal: 5}}>{i18n.t('common.fee')}</Label>
            </Item>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
        }}>
          <Item regular style={{flex: 1, paddingLeft: 10}}>
            <Icon name="ios-pricetag" size={21} />
            <Input placeholder={i18n.t('common.paymentId')} onChangeText={(paymentId) => this.setState({paymentId})} value={this.state.paymentId} />
          </Item>
          <Button rounded onPress={() => this.setState({paymentId: uuidv1().toString().replace(/-/g, '')})} style={{padding: 15, marginLeft: 5, backgroundColor: '#006e6e'}}><Icon name="md-add" color="white" size={21} /></Button>
        </View>

        <View style={{flexDirection: 'row', marginVertical: 30}}>
          <Text>{i18n.t('common.anonymity')}</Text>
          <Slider
            minimumValue={0}
            maximumValue={6}
            step={1}
            onSlidingComplete={anonymity => this.setState({ anonymity })}
            value={this.state.anonymity}
            style={{
              flex: 1
            }}
            thumbTintColor="#006e6e"
          />
          <Text>{this.state.anonymity}</Text>
        </View>

        <Button success block disabled={this.validateForm()} onPress={() => this.createTransaction()}><Text> {i18n.t('send.sendBtnLabel')} </Text></Button>
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
    newTransaction: (transaction) => dispatch(newTransaction(transaction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendScreen);