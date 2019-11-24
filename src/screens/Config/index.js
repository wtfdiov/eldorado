import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import i18n from 'i18n-js';

import * as actions from '../../store/actions';

import { GAP } from '../../components/style';

import Title from '../../components/common/Title';
import TwoFactor from './TwoFactor';
import ChooseLanguage from './ChooseLanguage';

function ConfigScreen() {
  useEffect(() => {
    dispatch(actions.check2FA());
  }, []);

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.config.isLoading);
  const twoFactor = useSelector(state => state.config.twoFactor);

  function enable2FA(twoFactorAuthToken) {
    dispatch(actions.enable2FA(twoFactorAuthToken));
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: GAP.default }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%'
        }}
      >
        <Title title={i18n.t('config.2FA.title')} />
        <TwoFactor isLoading={isLoading} twoFactorData={twoFactor} enable={enable2FA} />
        <Title title={`${i18n.t('config.language.title')} (${i18n.locale})`} />
        <ChooseLanguage />
      </ScrollView>
    </View>
  );
}

export default ConfigScreen;
