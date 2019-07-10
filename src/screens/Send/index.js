import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import uuidv1 from 'uuid/v1';
import i18n from 'i18n-js';
import Slider from '@react-native-community/slider';

import { connect } from 'react-redux';
import { newTransaction } from '../../store/actions';

import { config } from '../../../app.json';

import openQRScanner from '../../navigation/qrScanner';
import shortifyAddress from '../../helpers/shortfyAddress';
import { stringToHex } from '../../helpers/hexTool';
import formatNBR from '../../helpers/formatNBR';

import BlocksInfo from '../../components/common/BlocksInfo';
import { COLORS } from '../../components/style';

class SendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toAddress: '',
      amount: 0,
      fee: 0.0001,
      paymentId: '',
      anonymity: 1
    };
    this.initialState = this.state;
    this.setDestination = this.setDestination.bind(this);
  }

  validateForm() {
    return (
      !(this.props.selected && this.props.selected.address) ||
      !this.state.toAddress ||
      !this.state.amount ||
      !this.state.fee
    );
  }

  createTransaction() {
    const transaction = {
      changeAddress: this.props.selected ? this.props.selected.address : '',
      from: this.props.selected ? this.props.selected.address : '',
      fee: parseFloat(this.state.fee * config.defaultUnit),
      to: {
        address: this.state.toAddress.toString(),
        amount: parseFloat(this.state.amount * config.defaultUnit)
      },
      extra: {
        anonymity: this.state.anonymity,
        paymentId: stringToHex(this.state.paymentId)
      }
    };
    this.props.newTransaction(transaction);
    this.resetForm();
  }

  resetForm() {
    this.setState(this.initialState);
  }

  setDestination = toAddress => {
    this.setState({ toAddress });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Item regular style={{ flex: 1, paddingLeft: 10 }}>
            <Icon name="ios-wallet" size={21} />
            <Input
              placeholder={i18n.t('send.destinationInputLabel')}
              onChangeText={toAddress => this.setState({ toAddress })}
              value={this.state.toAddress}
              spellCheck={false}
            />
          </Item>
          <Button
            rounded
            onPress={() => openQRScanner({ setAddress: this.setDestination })}
            style={{ padding: 15, marginLeft: 5, backgroundColor: '#006e6e' }}
          >
            <Icon name="md-qr-scanner" color="white" size={21} />
          </Button>
        </View>

        {this.props.selected ? (
          <BlocksInfo
            available={this.props.selectedBalance.available}
            locked={this.props.selectedBalance.locked}
          />
        ) : (
          <Text style={{ alignSelf: 'center', margin: 10 }}>
            {i18n.t('send.selectAnWallet')}
          </Text>
        )}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10
          }}
        >
          <View style={{ flex: 2, paddingRigth: 10 }}>
            <Item regular>
              <Input
                onChangeText={amount => this.setState({ amount })}
                value={this.state.amount.toString()}
                keyboardType="number-pad"
              />
              <Label
                style={{
                  backgroundColor: '#c6f2f2',
                  fontSize: 12,
                  color: '#65b4b4',
                  height: '100%',
                  textAlignVertical: 'center',
                  paddingHorizontal: 5
                }}
              >
                {i18n.t('common.amount')}
              </Label>
            </Item>
          </View>

          <View style={{ flex: 2, paddingLeft: 10 }}>
            <Item regular>
              <Input
                onChangeText={fee => this.setState({ fee })}
                value={this.state.fee.toString()}
                keyboardType="number-pad"
              />
              <Label
                style={{
                  backgroundColor: '#c6f2f2',
                  fontSize: 12,
                  color: '#65b4b4',
                  height: '100%',
                  textAlignVertical: 'center',
                  alignContent: 'center',
                  paddingHorizontal: 5
                }}
              >
                {i18n.t('common.fee')}
              </Label>
            </Item>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Item regular style={{ flex: 1, paddingLeft: 10 }}>
            <Icon name="ios-pricetag" size={21} />
            <Input
              placeholder={i18n.t('common.paymentId')}
              onChangeText={paymentId => this.setState({ paymentId })}
              value={this.state.paymentId}
            />
          </Item>
          <Button
            rounded
            onPress={() =>
              this.setState({
                paymentId: uuidv1()
                  .toString()
                  .replace(/-/g, '')
              })
            }
            style={{ padding: 15, marginLeft: 5, backgroundColor: '#006e6e' }}
          >
            <Icon name="md-add" color="white" size={21} />
          </Button>
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 30 }}>
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

        <Button
          success
          block
          disabled={this.validateForm()}
          onPress={() => this.createTransaction()}
        >
          <Text> {i18n.t('send.sendBtnLabel')} </Text>
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: COLORS.grayBg
  }
});

const mapStateToProps = state => {
  return {
    wallets: state.wallets.wallets,
    selected: state.wallets.selected,
    selectedBalance: state.wallets.selectedBalance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newTransaction: transaction => dispatch(newTransaction(transaction))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendScreen);
