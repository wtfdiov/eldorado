import React, { useState, useCallback } from 'react';
import { Clipboard, View, Image, Text, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { Button, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';

import { COLORS, GAP } from '../../components/style';

function TwoFactor({ isLoading, twoFactorData, enable }) {
  const [twoFactorKey, setState] = useState('');

  const copyToClipboard = useCallback(async secret => {
    await Clipboard.setString(secret);
    ToastAndroid.show(i18n.t('config.2FA.copySecret'), ToastAndroid.SHORT);
  });

  if (!twoFactorData) {
    return null;
  }

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  const { dataUrl, isEnabled, secret } = twoFactorData;

  if (isEnabled) {
    return (
      <View
        style={{
          backgroundColor: COLORS.secondaryGreen,
          padding: GAP.default
        }}
      >
        <Text style={{ textAlign: 'center' }}>{i18n.t('config.2FA.activatedMessage')}</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 2, height: 150 }}>
          <Image
            style={{
              width: 150,
              height: 150,
              resizeMode: 'contain'
            }}
            source={{ uri: dataUrl }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ textAlign: 'center' }}>{i18n.t('config.2FA.inputKey')}</Text>
          <Item regular style={{ marginVertical: GAP.small }}>
            <Input keyboardType="numeric" value={twoFactorKey} onChangeText={twoFactorKey => setState(twoFactorKey)} />
          </Item>
          <Button success block onPress={() => enable(twoFactorKey)} disabled={twoFactorKey.length < 3}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16
              }}
            >
              {i18n.t('common.send')}
            </Text>
          </Button>
        </View>
      </View>
      <Text style={{ textAlign: 'center', marginVertical: GAP.default }}>{i18n.t('config.2FA.secretMessage')}</Text>
      <Item regular style={{ backgroundColor: '#f2f2f2' }}>
        <Input value={secret} style={{ backgroundColor: '#f7f7f7' }} disabled />
        <TouchableOpacity style={{ marginHorizontal: GAP.default }} onPress={() => copyToClipboard(secret)}>
          <Icon name="ios-copy" size={24} />
        </TouchableOpacity>
      </Item>
    </View>
  );
}

export default TwoFactor;
