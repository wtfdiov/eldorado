import React, { useEffect } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import i18n from 'i18n-js';

import * as actions from '../../store/actions';

import componentStyle from '../../components/style';

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

  const { height, width } = Dimensions.get('window');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={[
          {
            height: height * 0.8,
            width: width * 0.9,
            backgroundColor: 'white'
          },
          componentStyle.transactionCard,
          componentStyle.shadow
        ]}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 10
          }}
        >
          <Title title={i18n.t('config.2FA.title')} />
          <TwoFactor isLoading={isLoading} twoFactorData={twoFactor} enable={enable2FA} />
          <Title title={`${i18n.t('config.language.title')} (${i18n.locale})`} />
          <ChooseLanguage />
        </ScrollView>
      </View>
    </View>
  );
}

export default ConfigScreen;
