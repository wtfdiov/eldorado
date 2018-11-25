import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Picker, View } from 'react-native';
import { Input, Item } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import RadioGroup from 'react-native-radio-buttons-group';

import { connect } from 'react-redux';
class SendScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromAddress: '',
      toAddress: '',
      value: '',
      fee: '',
      paymentId: '',
      anonymity: [
        {
            label: '0',
        },
        {
            label: '1',
        },
        {
            label: '2',
        },
        {
            label: '3',
        },
        {
            label: '4',
        },
    ]
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text> Select the wallet to get the NBR from </Text>
        <Picker
          selectedValue={this.state.fromAddress}
          style={{ height: 50, width: '100%' }}
          onValueChange={(itemValue) => this.setState({fromAddress: itemValue})}
        >
          <Picker.Item label="N7VX9Zg2JtQLoMN...jhPwDe2H65RuJCP" value="fgsdgsdfgdg" />
          <Picker.Item label="jhPwDe2H65RuJCP...N7VX9Zg2JtQLoMN" value="rtyryrtytryrt" />
        </Picker>

        <Item regular style={{paddingLeft: 10}}>
          <Icon name="ios-wallet" size={21} />
          <Input placeholder='Destination' onChangeText={(toAddress) => this.setState({toAddress})} />
        </Item>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20}}>
          <View style={{flex: 2, paddingRigth: 10}}>
            <Item regular>
              <Input placeholder='Amount' onChangeText={(value) => this.setState({value})} keyboardType="number-pad" />
            </Item>
          </View>
        
          <View style={{flex: 2, paddingLeft: 10}}>
            <Item regular>
              <Input placeholder='Fee' onChangeText={(fee) => this.setState({fee})} keyboardType="number-pad" />
            </Item>
          </View>
        </View>

        <Item regular style={{paddingLeft: 10}}>
          <Icon name="ios-pricetag" size={21} />
          <Input placeholder='PaymentId' onChangeText={(paymentId) => this.setState({paymentId})} />
        </Item>

        <View style={{marginVertical: 20}}>
          <RadioGroup radioButtons={this.state.anonymity} onPress={anonymity => this.setState({ anonymity })} flexDirection="row" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(SendScreen);