import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Picker, View, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import QRCode from 'react-qr-code';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import shortifyAddress from '../../helpers/shortfyAddress';
import formatNBR from '../../helpers/formatNBR';
class SendScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
    }
  }

  componentDidUpdate() {
    if (!this.state.address && this.props.wallets.length) {
      this.setState({address: this.props.wallets[0].address})
    }
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Picker
          selectedValue={this.state.address}
          style={{ height: 50, width: '100%' }}
          onValueChange={(address) => this.setState({address})}
        >
          {this.props.wallets && this.props.wallets.map(wallet => (
            <Picker.Item key={wallet.id} label={`${shortifyAddress(wallet.address, 10)} (${formatNBR(wallet.balance.available)})`} value={wallet.address} />
          ))}
        </Picker>

        {this.state.address ? <QRCode value={this.state.address} fgColor="#60b145" /> : <ActivityIndicator size="large" color="#60b145" />}

    <Text> Share this QRCode to receive NBR in this wallet! </Text>
        <Button success iconLeft style={{padding: 10, alignSelf: 'center'}}><Icon name="md-share" size={18} color="white" /><Text style={{color: 'white', fontWeight: '600'}}> SHARE</Text></Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  return {
    wallets: state.wallets.wallets
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SendScreen);