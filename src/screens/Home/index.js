import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import WalletStats from '../../components/Home/WalletStats';

class HomedScreen extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <WalletStats />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  }
});

export default HomedScreen;