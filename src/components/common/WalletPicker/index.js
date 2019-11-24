import React from 'react';
import { ToastAndroid, Clipboard, View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';
import { IconButton } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';

import { selectWallet, createWallet, deleteWallet } from '../../../store/actions';

import logo from '../../../assets/logo-nbr.png';

import WalletSelector from './WalletSelector';
import { COLORS } from '../../style';

function WalletPicker() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.wallets.loading);
  const wallets = useSelector(state => state.wallets.wallets);
  const selected = useSelector(state => state.wallets.selected);

  async function copyToClipboard() {
    await Clipboard.setString(selected.address);
    ToastAndroid.show(i18n.t('common.components.walletPicker.addressCopied'), ToastAndroid.SHORT);
  }

  function selectWalletHandler(address) {
    const wallet = wallets.find(wallet => wallet.address === address);
    dispatch(selectWallet(wallet));
  }

  function createWalletHandler() {
    dispatch(createWallet());
  }

  function deleteWalletHandler(wallet) {
    dispatch(deleteWallet(wallet));
  }

  return (
    <View
      style={{
        width: '100%',
        height: 80,
        flexDirection: 'row'
      }}
    >
      <View
        style={{
          width: '30%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primaryGreen} />
        ) : (
          <Image source={logo} style={{ height: 48, width: 42 }} />
        )}
      </View>
      <View
        style={{
          width: '70%',
          justifyContent: 'space-around'
        }}
      >
        <WalletSelector
          loading={isLoading}
          wallets={wallets}
          selected={selected && selected.address}
          selectWallet={selectWalletHandler}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Button transparent light onPress={createWalletHandler}>
            <Icon name="md-add" size={24} color="#FFF" />
            <Text style={{ color: '#FFF' }}> {i18n.t('common.components.walletPicker.newWalletBtnLabel')}</Text>
          </Button>

          {selected ? <IconButton icon="content-copy" color="white" size={24} onPress={copyToClipboard} /> : null}

          {selected && selected.canDelete && (
            <IconButton icon="delete-forever" color="white" size={24} onPress={() => deleteWalletHandler(selected)} />
          )}
        </View>
      </View>
    </View>
  );
}

export default WalletPicker;
