import React, { Component } from 'react'
import { View, Picker, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import formatNBR from '../../../helpers/formatNBR';

class WalletPicker extends Component {

  render = () => {
    return (
      <View style={[{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#60b145',
        justifyContent: 'center',
        alignItems: 'center'
      }]}>
        <Icon name="ios-wallet" color="#009432" size={32} />
        {Object.keys(this.props.wallets).length > 0
        ?
        <Picker
        style={{ height: 100, width: '100%' }}
        onValueChange={(address) => this.props.onChange(address)}
        itemStyle={{
            fontSize: 8,
            height: 80,
            lineHeight: 12
        }}
      >
        {this.props.wallets.map(wallet => (
          <Picker.Item
            key={wallet.id}
            label={`${wallet.address} (${formatNBR(wallet.balance.available)})`} value={wallet.address}
          />
        ))}
      </Picker>
        :
        <Text>No wallets</Text>
        }
      </View>
    );
  }
}

export default WalletPicker