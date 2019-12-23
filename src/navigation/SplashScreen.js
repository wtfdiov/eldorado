import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

import { tryAutoLogin } from '../store/actions';

import { LocalizationContext } from '../../App';

function SplashScreen() {
  const token = useSelector(state => state.auth.token);
  const isAutoLoginLoading = useSelector(state => state.auth.autoLoginLoading);
  const dispatch = useDispatch();
  const { t } = React.useContext(LocalizationContext);

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, []);

  if (isAutoLoginLoading) {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator color="#34495e" size="large" />
        <Text style={{ color: '#34495e' }}> {`${t('common.loading')}...`} </Text>
      </View>
    );
  }

  if (token) return <HomeStack />;
  return <AuthStack />;
}

export default SplashScreen;
