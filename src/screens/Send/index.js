import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Label, Input, Item, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import uuidv1 from 'uuid/v1';
import i18n from 'i18n-js';
import Slider from '@react-native-community/slider';

import { useSelector, useDispatch } from 'react-redux';
import { newTransaction } from '../../store/actions';

import { config } from '../../../app.json';

import { stringToHex } from '../../helpers/hexTool';

import BlocksInfo from '../../components/common/BlocksInfo';
import NoData from '../../components/common/NoData';
import { COLORS } from '../../components/style';

function SendScreen() {
  const navigation = useNavigation();

  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('0');
  const [fee, setFee] = useState('0.0001');
  const [paymentId, setPaymentId] = useState('');
  const [anonymity, setAnonymity] = useState(1);

  const dispatch = useDispatch();
  const selected = useSelector(state => state.wallets.selected);
  const selectedBalance = useSelector(state => state.wallets.selectedBalance);

  function validateForm() {
    return (
      toAddress.length > 0 &&
      parseFloat(amount) > 0 &&
      parseFloat(amount) <= selectedBalance.available &&
      parseFloat(fee) > 0
    );
  }

  const isFormValid = validateForm();

  function createTransaction() {
    const transaction = {
      changeAddress: selected ? selected.address : '',
      from: selected ? selected.address : '',
      fee: parseFloat(fee * config.defaultUnit),
      to: {
        address: toAddress.toString(),
        amount: parseFloat(amount * config.defaultUnit)
      },
      extra: {
        anonymity: anonymity,
        paymentId: stringToHex(paymentId)
      }
    };
    dispatch(newTransaction(transaction));
    resetForm();
  }

  function resetForm() {
    setToAddress('');
    setAmount('0');
    setFee('0.0001');
    setPaymentId('');
    setAnonymity(1);
  }

  function setDestination(toAddress) {
    setToAddress(toAddress);
  }

  if (!selected) {
    return (
      <View style={styles.container}>
        <NoData message={i18n.t('send.selectAnWallet')}>
          <Icon name="md-wallet" size={72} color={COLORS.darkGray} />
        </NoData>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Item regular style={{ flex: 1, paddingLeft: 10 }}>
          <Icon name="ios-wallet" size={21} />
          <Input
            placeholder={i18n.t('send.destinationInputLabel')}
            onChangeText={toAddress => setToAddress(toAddress)}
            value={toAddress}
            spellCheck={false}
          />
        </Item>
        <Button
          rounded
          onPress={() => navigation.navigate('QRScanner', { setDestination })}
          style={{ padding: 15, marginLeft: 5, backgroundColor: COLORS.primaryGreen }}
        >
          <Icon name="md-qr-scanner" color="white" size={21} />
        </Button>
      </View>

      {selected ? (
        <BlocksInfo available={selectedBalance.available} locked={selectedBalance.locked} />
      ) : (
        <Text style={{ alignSelf: 'center', margin: 10 }}>{i18n.t('send.selectAnWallet')}</Text>
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
            <Input onChangeText={amount => setAmount(amount)} value={amount} keyboardType="number-pad" />
            <Label
              style={{
                backgroundColor: `${COLORS.primaryGreen}30`,
                fontSize: 12,
                color: COLORS.primaryGreen,
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
            <Input onChangeText={fee => setFee(fee)} value={fee} keyboardType="number-pad" />
            <Label
              style={{
                backgroundColor: `${COLORS.primaryGreen}30`,
                fontSize: 12,
                color: COLORS.primaryGreen,
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
            onChangeText={paymentId => setPaymentId(paymentId)}
            value={paymentId}
          />
        </Item>
        <Button
          rounded
          onPress={() =>
            setPaymentId(
              uuidv1()
                .toString()
                .replace(/-/g, '')
            )
          }
          style={{ padding: 15, marginLeft: 5, backgroundColor: COLORS.primaryGreen }}
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
          onSlidingComplete={anonymity => setAnonymity(anonymity)}
          value={anonymity}
          style={{
            flex: 1
          }}
          thumbTintColor={COLORS.primaryGreen}
          maximumTrackTintColor={COLORS.primaryGreen}
        />
        <Text>{anonymity}</Text>
      </View>

      <Button success block disabled={!isFormValid} onPress={createTransaction}>
        <Text> {i18n.t('send.sendBtnLabel')} </Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.grayBg
  }
});

export default SendScreen;
