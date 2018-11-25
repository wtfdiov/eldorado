import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Linking, View, Text } from 'react-native';

import { config } from '../../../app.json';

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