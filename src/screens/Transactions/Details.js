import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Linking, View, Text } from 'react-native';

import { config } from '../../../app.json';

import Pills from '../../components/common/TPills';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transaction: props.transactions.find(item => item.id === props.transactionId)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Linking.openURL(config.explorerHash.replace('@{hash}', this.state.transaction.transactionHash))}>
          <Text>Click on me</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Pills icon={this.state.transaction.status === 2 ? 'ios-checkmark-circle' : 'ios-clock'} text={this.state.transaction.status === 2 ? 'Confirmed' : 'Awaiting'} />
          <Pills icon="ios-cash" text={this.state.transaction.amount} />
          <Pills icon="md-trending-down" text={this.state.transaction.fee} />
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

const mapStateToProps = state => ({ transactions: state.transactions.transactions});

export default connect(mapStateToProps, null)(Details)