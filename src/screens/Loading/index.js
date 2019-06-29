import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import { tryAutoLogin } from '../../store/actions';

class Loading extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  static navigatorStyle = {
    navBarHidden: true
  };

  render() {
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
        <Text style={{ color: '#34495e' }}>
          {' '}
          {`${i18n.t('common.loading')}...`}{' '}
        </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(tryAutoLogin())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Loading);
