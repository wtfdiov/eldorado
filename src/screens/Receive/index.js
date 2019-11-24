import React from 'react';
import { View, Share, StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'native-base';
import QRCode from 'react-qr-code';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';

import { useSelector } from 'react-redux';

import NoData from '../../components/common/NoData';
import { COLORS } from '../../components/style';

function SendScreen() {
  const selected = useSelector(state => state.wallets.selected);

  function shareHandler() {
    Share.share(
      {
        message: `${selected.address}`,
        url: `${selected.address}`,
        title: i18n.t('receive.shareDialogTitle')
      },
      {
        dialogTitle: i18n.t('receive.shareDialogTitle')
      }
    );
  }

  if (!selected) {
    return (
      <View style={styles.container}>
        <NoData message={i18n.t('send.selectAnWallet')}>
          <Icon name="md-wallet" size={72} />
        </NoData>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selected ? (
        <QRCode value={selected.address} fgColor="#000" />
      ) : (
        <Fragment>
          <Icon name="ios-qr-scanner" size={120} color="#006e6e" />
        </Fragment>
      )}

      <Text style={{ textAlign: 'center' }}>
        {' '}
        {selected ? i18n.t('receive.walletQRDesc') : i18n.t('receive.noWalletMsg')}{' '}
      </Text>
      <Button
        iconLeft
        onPress={shareHandler}
        disabled={!selected}
        style={{
          padding: 10,
          alignSelf: 'center',
          backgroundColor: '#006e6e'
        }}
      >
        <Icon name="md-share" size={18} color="white" />
        <Text style={{ color: 'white', fontWeight: '600' }}> {i18n.t('receive.shareBtnLabel')}</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.grayBg
  }
});

export default SendScreen;
